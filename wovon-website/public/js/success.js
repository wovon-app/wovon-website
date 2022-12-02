window.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const api_token = params.get('apiToken');
    const request_qty = params.get('request');
    const random_key = params.get('randomKey');

    setTimeout(() => {
        document.querySelector('#contentContainer').innerHTML = `
            <div class="alert alert-success" role="alert">
                Se acreditaron las consultas compradas.
            </div>
            <a type="button" class="btn btn-wovon" href="/">Vovler al inicio</a>
        `
    }, 5000)
});