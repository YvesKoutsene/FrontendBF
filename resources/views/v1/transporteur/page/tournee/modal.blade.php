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
                }
            });

            if (confirmation.isConfirmed) {
                const result = await demarrerTournee(keytournee, values);
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
                }
            });

            if (confirmation.isConfirmed) {
                const result = await cloturerTournee(keytournee, values);
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
