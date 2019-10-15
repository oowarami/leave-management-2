function notify(type, title) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000
    });

    Toast.fire({
        type,
        title
    });
}