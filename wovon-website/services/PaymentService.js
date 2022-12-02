const axios = require("axios");

class PaymentService {
    async createPayment(total, title, email, api_token, req, randomKey) {
        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
            payer_email: email,
            items: [
                {
                    title: title,
                    quantity: 1,
                    unit_price: total
                }
            ],
            back_urls: {
                failure: `${process.env.BASE_URL}/payment/failure`,
                pending: `${process.env.BASE_URL}/payment/failure`,
                success: `${process.env.BASE_URL}/payment/success?apiToken=${api_token}&request=${req}&randomKey=${randomKey}`
            },
            auto_return: "approved"
        };

        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        return payment.data;
    }
}

module.exports = PaymentService;