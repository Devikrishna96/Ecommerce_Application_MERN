const Order = require('../Models/orderModel');
const Product = require('../Models/productModel');

// Add Order
const addOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // Validate request
    if (!items || !items.length) {
      return res.status(400).json({ error: "No items provided for the order" });
    }

    // Check if user exists
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    let totalPrice = 0;
    const orderItems = [];

    // Build order items and calculate total
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ error: `Product not found: ${item.productId}` });

      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
        title: product.title,
      });
    }

    // Create new order
    const newOrder = new Order({
      userId,
      products: orderItems,
      totalPrice,
      paymentStatus: "success", // default to success for now
    });

    const savedOrder = await newOrder.save();
    console.log("Saved Order:", savedOrder);

    return res.status(201).json({ message: "Order placed successfully", data: savedOrder });

  } catch (error) {
    console.error("Add Order Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get User Orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const orders = await Order.find({ userId })
      .populate('products.productId', 'title price')
      .sort({ createdAt: -1 });

    console.log("Fetched Orders:", orders);

    if (!orders.length) {
      return res.status(404).json({ error: 'No orders found' });
    }

    return res.status(200).json({ data: orders });
  } catch (error) {
    console.error("Get User Orders Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export all controllers
module.exports = {
  addOrder,
  getUserOrders,
};
