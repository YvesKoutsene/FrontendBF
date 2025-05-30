<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    // Style pour les boutons warning
    const warningButtonStyle = `
        background-color: #f59e0b !important;
        color: white !important;
        border: none !important;
    `;

    function validateInput(input) {
        let rawValue = input.value.replace(/\D/g, '');
        if (rawValue.length > 12) {
            rawValue = rawValue.substring(0, 12);
        }
        const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        input.value = formattedValue;
    }

    async function showAlertStart() {
        const steps = ['1', '2', '3'];
        const swalQueueStep = Swal.mixin({
            confirmButtonText: 'Suivant →',
            showCancelButton: false,
            progressSteps: steps,
            inputAttributes: {
                required: true,
            },
            validationMessage: 'Ce champ est obligatoire',
            padding: '2em',
            didOpen: () => {
                const confirmBtn = Swal.getConfirmButton();
                confirmBtn.style.cssText = warningButtonStyle;
            }
        });

        const values = {};

        try {
            // Étape 1 : Champ Prix
            const priceResult = await swalQueueStep.fire({
                title: 'Prix(FCFA)',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Entrez le prix',
                    required: true,
                    name: 'prix',
                    oninput: 'validateInput(this)' // Appelle la fonction de validation
                },
                currentProgressStep: 0,
            });
            if (!priceResult.value) return;
            values.prix = parseFloat(priceResult.value.replace(/\s/g, ''));

            // Étape 2 : Champ Commentaire
            const commentResult = await swalQueueStep.fire({
                title: 'Commentaire',
                input: 'textarea',
                inputAttributes: {
                    placeholder: 'Entrez un commentaire (optionnel)',
                    name: 'commentaire',
                },
                currentProgressStep: 1,
            });
            values.commentaire = commentResult.value || '';

            const confirmation = await Swal.fire({
            title: 'Êtes-vous sûr de vouloir envoyer cette proposition ?',
            padding: '2em',
            confirmButtonText: 'Oui, continuer',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            didOpen: () => {
                const confirmBtn = Swal.getConfirmButton();
                confirmBtn.style.cssText = warningButtonStyle;
            },
            preConfirm: async () => {
                const btn = Swal.getConfirmButton();
                btn.disabled = true;
                btn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none"
                         stroke-linecap="round" stroke-linejoin="round"
                         class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg">
                        <line x1="12" y1="2" x2="12" y2="6"></line>
                        <line x1="12" y1="18" x2="12" y2="22"></line>
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                        <line x1="2" y1="12" x2="6" y2="12"></line>
                        <line x1="18" y1="12" x2="22" y2="12"></line>
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                    </svg>
                `;

                try {
                    await proposerPrixFret(keyfret, values);
                    await processData(values);
                    return true;
                } catch (error) {
                    const message = error?.response?.data?.message || error.message || 'Une erreur est survenue.';
                    Swal.showValidationMessage(message);
                    return false;
                }
            }
        });

        if (confirmation.isConfirmed) {
            await Swal.fire({
                icon: 'success',
                title: 'Proposition envoyée avec succès !',
                timer: 1500,
                showConfirmButton: false
            });
            window.location.reload();
        }

        } catch (error) {
            const message = error?.response?.data?.message || error.message || 'Une erreur est survenue.';
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: message,
            });
        }
    }

    async function processData(values) {
        console.log(values);
    }

     async function voirRaisonRefus(element) {
         const raison = element.getAttribute('data-raisonrefus') || 'Aucune raison précisée';

         Swal.fire({
             title: `<div style="text-align: center;">Motif de refus : ${raison}</div>`,
             icon: 'info',
             confirmButtonText: 'Fermer',
             padding: '2em',
             customClass: {
                 confirmButton: 'btn btn-warning'
             },
             buttonsStyling: false
         });
     }

</script>

