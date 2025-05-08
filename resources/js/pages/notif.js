// Pour la notification
export function showMessage(msg = 'Notification.', position = 'top-end', type = 'success', duration = 5000) {
    const toast = window.Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: duration,
        timerProgressBar: true,
        showCloseButton: true,
        icon: type,
        customClass: {
            popup: 'animate__animated animate__slideInDown',
            title: 'text-sm',
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', window.Swal.stopTimer);
            toast.addEventListener('mouseleave', window.Swal.resumeTimer);
        },
        didClose: () => {
            toast.classList.add('animate__fadeOutUp');
        }
    });

    toast.fire({
        title: msg,
    });
}
