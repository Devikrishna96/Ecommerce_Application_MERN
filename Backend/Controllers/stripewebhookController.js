// Controllers/stripeWebhookController.js
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET);
const Order = require('../Models/orderModel');

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Use req.body directly (raw buffer) because express.raw() provides it
    event = stripe.webhooks.constructEvent(
      req.body, // raw body from express.raw()
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.metadata.orderId;

      // Update order status to completed
      await Order.findByIdAndUpdate(
        orderId,
        { status: 'completed', paymentStatus: 'success' },
        { new: true }
      );

      console.log('✅ Order completed via webhook:', orderId);
    }

    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;

      // Update order status to failed
      await Order.findByIdAndUpdate(
        orderId,
        { status: 'pending', paymentStatus: 'failed' },
        { new: true }
      );

      console.log('❌ Payment failed for order:', orderId);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = { stripeWebhook };
