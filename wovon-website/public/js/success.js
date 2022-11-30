window.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        document.querySelector('#contentContainer').innerHTML = `
            <div class="alert alert-success" role="alert">
                Se acreditaron las consultas compradas.
            </div>
            <a type="button" class="btn btn-wovon" href="/">Vovler al inicio</a>
        `
    }, 5000)
});