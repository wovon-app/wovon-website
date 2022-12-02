window.addEventListener('DOMContentLoaded', async (event) => {
    let email;
    let user_api_token;
    let remaining_requests;
    let wovon_access_token;

    await fetch('/internal/user_data')
    .then(response => response.json())
    .then(data => {
        email = data.email;
        user_api_token = data.api_token;
    });
    await fetch('/internal/wovon_token')
    .then(response => response.json())
    .then(data => {
        wovon_access_token = data.token;
    });
    await fetch(`https://wovon.me/api/get_remaining_requests?user_token=${user_api_token}`, {
        headers: {
          'Authorization': `Bearer ${wovon_access_token}`,
        }
    })
    .then(response => response.json())
    .then(data => {
        remaining_requests = data.remaining_requests
    });

    document.querySelector('#informationContainer').innerHTML = `
        <form class="row">
            <div class="col-12">
                <input 
                    type="text" 
                    class="form-control form-control-user"
                    readonly
                    value="${user_api_token}"
                >
            </div>
        </form>
        <div class="text-center pt-2">
            <p class="text-gray-800 mb-4">Actualmente, tenés <strong>${remaining_requests}</strong> consultas disponibles.</p>
        </div>
    `

    document.querySelector('#buyBasic').onclick = () => callPaymentApi("basic", email, user_api_token, wovon_access_token);
    document.querySelector('#buyPro').onclick = () => callPaymentApi("pro", email, user_api_token, wovon_access_token);
    document.querySelector('#buyPlatinium').onclick = () => callPaymentApi("platinium", email, user_api_token, wovon_access_token);
});

async function callPaymentApi(route, email, user_api_token, wovon_access_token) {
    let random_key;
    await fetch(`https://wovon.me/api/get_random_key?user_token=${user_api_token}`, {
        headers: {
          'Authorization': `Bearer ${wovon_access_token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        }
    })
    .then(response => response.json())
    .then(data => {
        random_key = data.randomKey
    });

    window.location = `${window.location.origin}/payment/make/${route}?email=${email}&apiToken=${user_api_token}&randomKey=${random_key}`;
}
