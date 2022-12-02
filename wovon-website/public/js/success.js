window.addEventListener('DOMContentLoaded', async (event) => {
    const params = new URLSearchParams(window.location.search);
    const user_api_token = params.get('apiToken');
    const request_qty = parseInt(params.get('request'));
    const random_key = parseInt(params.get('randomKey'));

    let price;
    if (request_qty === 10) {
        price = 10.0;
    } else if (request_qty === 50) {
        price = 35.0;
    } else if (request_qty === 300) {
        price = 200;
    }

    let wovon_access_token;
    await fetch('/internal/wovon_token')
    .then(response => response.json())
    .then(data => {
        wovon_access_token = data.token;
    });

    await fetch(`https://wovon.me/api/add_request_for_user`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${wovon_access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_token: user_api_token,
            cant_request: request_qty,
            random_key: random_key,
            price: price
        })
    })
    .then(response => {
        if (response.status >= 400) {
            throw "Error";
        } else {
            return response.json();
        }
    })
    .then(() => {
        document.querySelector('#contentContainer').innerHTML = `
            <div class="alert alert-success" role="alert">
                Se acreditaron las consultas compradas.
            </div>
            <a type="button" class="btn btn-wovon" href="/">Vovler al inicio</a>
        `
    })
    .catch(() => {
        window.location.pathname = '/payment/failure';
    });
});