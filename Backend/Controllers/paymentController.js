const Stripe = require('stripe');
const Order = require('../Models/orderModel');

const stripe = new Stripe(process.env.STRIPE_SECRET);

const PaymentFunction = async (req, res) => {
  try {
    const { products } = req.body;
    console.log("products", req.body);

    // ✅ FIX 1 — get userId properly from auth middleware
    const userId = req.user; // <-- use req.user (your auth middleware sets this)

    // ✅ FIX 2 — calculate total amount
    const totalAmount = products.reduce(
      (acc, p) => acc + p.productId.price * (p.quantity || 1),
      0
    );

    // ✅ FIX 3 — match your order schema field names
    const newOrder = await Order.create({
      userId: userId,        // ✅ changed from "user" → "userId"
      products: products.map(p => ({
        productId: p.productId._id,
        quantity: p.quantity || 1,
        price: p.productId.price,
        title: p.title
      })),
      totalPrice: totalAmount, // ✅ match schema
      status: 'pending',
      paymentStatus: 'pending',
    });

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product.title,
          images: [product.productId.image],
        },
        unit_amount: Math.round(product.productId.price * 100),
      },
      quantity: product.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment/success?orderId=${newOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/failed`,
      metadata: { orderId: newOrder._id.toString() }, // ✅ store order ID for webhook use
    });

    return res.json({ success: true, sessionId: session.id });

  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ error: err.message || "Internal server error" });
  }
};

module.exports = {
  PaymentFunction,
};
