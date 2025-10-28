// Controllers/stripeWebhookController.js
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET);
const Order = require('../Models/orderModel'); // adjust path if needed

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody, // raw body is required for Stripe verification
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const orderId = session.metadata.orderId;

      // Update order status to completed
      await Order.findByIdAndUpdate(orderId, { status: 'completed', paymentStatus: 'success' });

      console.log('Order completed via webhook:', orderId);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = { stripeWebhook };
