<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    // Style pour les boutons warning
    const warningButtonStyle = `
        background-color: #f59e0b !important;
        color: white !important;
        border: none !important;
    `;

    // Pour démarrer une tournée
    async function showAlertStart(keytournee) {
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
            const positionResult = await swalQueueStep.fire({
                title: 'Position actuelle',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Position actuelle',
                    required: true,
                    name: 'position',
                },
                currentProgressStep: 0,
            });
            if (!positionResult.value) return;
            values.position = positionResult.value;

            const latitudeResult = await swalQueueStep.fire({
                title: 'Latitude',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Latitude',
                    required: true,
                    name: 'latitude',
                },
                currentProgressStep: 1,
            });
            if (!latitudeResult.value || !isValidCoordinate(latitudeResult.value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Veuillez entrer une latitude valide (entre -90 et 90)',
                });
                return;
            }
            values.latitude = parseFloat(latitudeResult.value);

            const longitudeResult = await swalQueueStep.fire({
                title: 'Longitude',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Longitude',
                    required: true,
                    name: 'longitude',
                },
                currentProgressStep: 2,
            });
            if (!longitudeResult.value || !isValidCoordinate(longitudeResult.value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Veuillez entrer une longitude valide (entre -180 et 180)',
                });
                return;
            }
            values.longitude = parseFloat(longitudeResult.value);

            const confirmation = await Swal.fire({
                title: 'Êtes-vous sûr de vouloir commencer cette tournée ?',
                padding: '2em',
                confirmButtonText: 'Oui, démarrer',
                showCancelButton: true,
                cancelButtonText: 'Annuler',
                didOpen: () => {
                    const confirmBtn = Swal.getConfirmButton();
                    confirmBtn.style.cssText = warningButtonStyle;
                },
                preConfirm: async () => {
                    const confirmBtn = Swal.getConfirmButton();
                    confirmBtn.disabled = true;
                    confirmBtn.innerHTML = `
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
                        await demarrerTournee(keytournee, values);
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
                    title: 'Tournée démarrée avec succès !',
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

    // Pour vérifier la latitude/longitude
    function isValidCoordinate(value) {
        const number = parseFloat(value);
        return !isNaN(number) && ((value.includes('.') || value.includes(',')) ? (number >= -90 && number <= 90) : (number >= -180 && number <= 180));
    }

    // Pour clôturer une tournée
    async function showAlertEnd(keytournee) {
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
            const positionResult = await swalQueueStep.fire({
                title: 'Position actuelle',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Position actuelle',
                    required: true,
                    name: 'position',
                },
                currentProgressStep: 0,
            });
            if (!positionResult.value) return;
            values.position = positionResult.value;

            const latitudeResult = await swalQueueStep.fire({
                title: 'Latitude',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Latitude',
                    required: true,
                    name: 'latitude',
                },
                currentProgressStep: 1,
            });
            if (!latitudeResult.value || !isValidCoordinate(latitudeResult.value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Veuillez entrer une latitude valide (entre -90 et 90)',
                });
                return;
            }
            values.latitude = parseFloat(latitudeResult.value);

            const longitudeResult = await swalQueueStep.fire({
                title: 'Longitude',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Longitude',
                    required: true,
                    name: 'longitude',
                },
                currentProgressStep: 2,
            });
            if (!longitudeResult.value || !isValidCoordinate(longitudeResult.value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Veuillez entrer une longitude valide (entre -180 et 180)',
                });
                return;
            }
            values.longitude = parseFloat(longitudeResult.value);

            const confirmation = await Swal.fire({
                title: 'Êtes-vous sûr de vouloir clôturer cette tournée ?',
                padding: '2em',
                confirmButtonText: 'Oui, clôturer',
                showCancelButton: true,
                cancelButtonText: 'Annuler',
                didOpen: () => {
                    const confirmBtn = Swal.getConfirmButton();
                    confirmBtn.style.cssText = warningButtonStyle;
                },
                preConfirm: async () => {
                    const confirmBtn = Swal.getConfirmButton();

                    confirmBtn.disabled = true;
                    confirmBtn.innerHTML = `
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
                        await cloturerTournee(keytournee, values);
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
                    title: 'Tournée clôturée avec succès !',
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
</script>
