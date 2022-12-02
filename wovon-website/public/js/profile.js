window.addEventListener('DOMContentLoaded', async (event) => {
    let email;
    let user_api_token;
    let random_key;

    await fetch('/internal/user_data')
    .then(response => response.json())
    .then(data => {
        email = data.email;
        user_api_token = data.api_token;
    });    

    // getDataFromWovonApi()
    random_key = "123"

    document.querySelector('#apiAccessToken').value = user_api_token;
    document.querySelector('#availableRequests').innerHTML = "xxx";

    document.querySelector('#buyBasic').onclick = () => callPaymentApi("basic", email, user_api_token, random_key);
    document.querySelector('#buyPro').onclick = () => callPaymentApi("pro", email, user_api_token, random_key);
    document.querySelector('#buyPlatinium').onclick = () => callPaymentApi("platinium", email, user_api_token, random_key);
});

function callPaymentApi(route, email, user_api_token, random_key) {
    window.location = `${window.location.origin}/payment/make/${route}?email=${email}&apiToken=${user_api_token}&randomKey=${random_key}`;
}
