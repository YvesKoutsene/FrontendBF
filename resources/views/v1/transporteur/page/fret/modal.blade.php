<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    // Style pour les boutons warning
    const warningButtonStyle = `
        background-color: #f59e0b !important;
        color: white !important;
        border: none !important;
    `;

    function validateInput(input) {
        input.value = input.value.replace(/[^0-9]/g, '');

        if (input.value.length > 10) {
            input.value = input.value.substring(0, 10);
        }
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
            values.prix = parseFloat(priceResult.value);

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

            // Étape 3 : Confirmation
            const confirmation = await Swal.fire({
                title: 'Êtes-vous sûr de vouloir envoyer cette proposition ?',
                padding: '2em',
                confirmButtonText: 'Oui, continuer',
                showCancelButton: true,
                cancelButtonText: 'Annuler',
                didOpen: () => {
                    const confirmBtn = Swal.getConfirmButton();
                    confirmBtn.style.cssText = warningButtonStyle;
                }
            });

            if (confirmation.isConfirmed) {
                const result = await proposerPrixFret(keyfret, values);
                await processData(values);
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

</script>
