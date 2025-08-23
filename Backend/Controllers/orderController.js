const Order = require('../Models/orderModel');
const Product = require('../Models/productModel');

// Add order
const addOrder = async (req, res) => {
  try {
    const { items, paymentMethod, shippingAddress } = req.body;
    const userId = req.user.id;

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      paymentMethod,
      shippingAddress,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', data: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOneAndDelete({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// View all orders (Admin)
const viewAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
    if (!orders.length) {
      return res.status(404).json({ error: 'No orders found' });
    }
    res.status(200).json({ data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
  
const orders = await Order.find({ userId }).populate('products.productId', 'name price');     console.log("Orders :" ,orders)
    if (!orders.length) {
      return res.status(404).json({ error: 'No orders found' });
    }
    res.status(200).json({ data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get total sales
const totalSales = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders.length) {
      return res.status(404).json({ error: 'No orders found' });
    }
    const total = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    res.status(200).json({ data: { totalSales: total } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//update order status
const updateOrderStatus = async (req, res) => {
  try {
      const { orderId, status } = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

      if (!updatedOrder) return res.status(404).json({ error: "Order not found" });

      return res.status(200).json({ message: `Order status updated to ${status}`, order: updatedOrder });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addOrder,
  deleteOrder,
  viewAllOrders,
  getUserOrders,
  totalSales,
};
