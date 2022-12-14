class PaymentController {
    constructor(service) {
        this.service = service;
    }
  
    async getPaymentLink(req, res, price, title, email, api_token, request_qty, random_key) {
        try {
            const payment = await this.service.createPayment(price, title, email, api_token, request_qty, random_key);
            return payment.init_point;
        } catch (error) {
            console.log(error);
  
            return res
                .status(500)
                .json({ error: true, msg: "Failed to create payment" });
        }
    }
}
  
module.exports = PaymentController;