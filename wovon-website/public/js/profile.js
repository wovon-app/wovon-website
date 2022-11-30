window.addEventListener('DOMContentLoaded', (event) => {
    let email;
    let user_id;
    let random_key;
    // getDataFromAuth0Api()
    email = "test_user_7981642@testuser.com";
    // getDataFromWovonApi()
    user_id = "1"
    random_key = "123"

    document.querySelector('#apiAccessToken').value = "xxx";
    document.querySelector('#availableRequests').innerHTML = "xxx";

    document.querySelector('#buyBasic').onclick = () => callPaymentApi("basic", email, user_id, random_key);
    document.querySelector('#buyPro').onclick = () => callPaymentApi("pro", email, user_id, random_key);
    document.querySelector('#buyPlatinium').onclick = () => callPaymentApi("platinium", email, user_id, random_key);
});

function callPaymentApi(route, email, user_id, random_key) {
    window.location = `${window.location.origin}/payment/make/${route}?email=${email}&userId=${user_id}&randomKey=${random_key}`;
}
