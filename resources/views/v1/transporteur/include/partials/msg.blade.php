<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
    window.showMessage = (msg = 'Notification.', position = 'bottom-start', showCloseButton = true, duration = 3000) => {
        const toast = window.Swal.mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: duration,
            showCloseButton: showCloseButton,
        });
        toast.fire({
            title: msg,
        });
    };

    window.coloredToast = (color) => {
        const toast = window.Swal.mixin({
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
            animation: false,
            customClass: {
                popup: `color-${color}`,
            },
            target: document.getElementById(color + '-toast'),
        });
        toast.fire({
            title: 'Example notification text.',
        });
    };
</script>
