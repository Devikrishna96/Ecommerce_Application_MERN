// const Order = require('../Models/orderModel');
// const Product = require('../Models/productModel');

// // Add order
// const addOrder = async (req, res) => {
//   try {
//     const { items, paymentMethod, shippingAddress } = req.body;
//     const userId = req.user.id;

//     let totalAmount = 0;
//     const orderItems = [];

//     for (const item of items) {
//       const product = await Product.findById(item.productId);
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }

//       const itemTotal = product.price * item.quantity;
//       totalAmount += itemTotal;
//       orderItems.push({
//         productId: item.productId,
//         quantity: item.quantity,
//         price: product.price,
//       });
//     }

//     // const newOrder = new Order({
//     //   userId,
//     //   items: orderItems,
//     //   totalAmount,
//     //   paymentMethod,
//     //   shippingAddress,
//     // });
//     const newOrder = new Order({
//   userId,
//   products: orderItems,   // <-- Fix this line
//   totalPrice: totalAmount, // <-- also fix name to match model
//   paymentStatus: "success", // optional if you handle payments
// });

//     await newOrder.save();
//     res.status(201).json({ message: 'Order placed successfully', data: newOrder });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Delete order
// const deleteOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const userId = req.user.id;

//     const order = await Order.findOneAndDelete({ _id: orderId, userId });
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     res.status(200).json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // View all orders (Admin)
// const viewAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
//     if (!orders.length) {
//       return res.status(404).json({ error: 'No orders found' });
//     }
//     res.status(200).json({ data: orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Get user orders
// const getUserOrders = async (req, res) => {
//   try {
//     // const userId = req.user;
//     const userId = req.user.id || req.user._id;

  
// const orders = await Order.find({ userId }).populate('products.productId', 'title price');    
//  console.log("Orders :" ,orders)
//     if (!orders.length) {
//       return res.status(404).json({ error: 'No orders found' });
//     }
//     res.status(200).json({ data: orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Get total sales
// const totalSales = async (req, res) => {
//   try {
//     const orders = await Order.find();
//     if (!orders.length) {
//       return res.status(404).json({ error: 'No orders found' });
//     }
//     const total = orders.reduce((acc, order) => acc + order.totalAmount, 0);
//     res.status(200).json({ data: { totalSales: total } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// //update order status
// const updateOrderStatus = async (req, res) => {
//   try {
//       const { orderId, status } = req.body;
//       const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

//       if (!updatedOrder) return res.status(404).json({ error: "Order not found" });

//       return res.status(200).json({ message: `Order status updated to ${status}`, order: updatedOrder });
//   } catch (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = {
//   addOrder,
//   deleteOrder,
//   viewAllOrders,
//   getUserOrders,
//   totalSales,
// };








const Order = require('../Models/orderModel');
const Product = require('../Models/productModel');

// -------------------- Add Order --------------------
const addOrder = async (req, res) => {
  try {
    const { items, paymentMethod, shippingAddress } = req.body;
    const userId = req.user?.id || req.user?._id; // ✅ MODIFIED: optional chaining

    if (!items || !items.length) return res.status(400).json({ error: 'No items provided' }); // ✅ ADDED

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ error: `Product not found: ${item.productId}` }); // ✅ MODIFIED

      totalPrice += product.price * item.quantity;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
        title: product.title, // ✅ ADDED: include title for reference
      });
    }

    const newOrder = new Order({
      userId,
      products: orderItems,         // ✅ MODIFIED: match model's field name
      totalPrice,                   // ✅ MODIFIED: match model's field name
      status: 'pending',            // ✅ ADDED: default order status
      paymentStatus: 'success',     // ✅ ADDED: adjust based on actual payment
      paymentMethod: paymentMethod, // ✅ ADDED: optional
      shippingAddress,              // ✅ ADDED: optional
    });

    const savedOrder = await newOrder.save();
    console.log('Saved Order:', savedOrder);

    return res.status(201).json({ message: 'Order placed successfully', data: savedOrder });
  } catch (error) {
    console.error('Add Order Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// -------------------- Delete Order --------------------
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?.id || req.user?._id; // ✅ MODIFIED: optional chaining

    const order = await Order.findOneAndDelete({ _id: orderId, userId });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete Order Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// -------------------- View All Orders (Admin) --------------------
const viewAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    if (!orders.length) return res.status(404).json({ error: 'No orders found' });

    return res.status(200).json({ data: orders });
  } catch (error) {
    console.error('View All Orders Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// -------------------- Get User Orders --------------------
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id; // ✅ MODIFIED: optional chaining
    if (!userId) return res.status(401).json({ error: 'User not authenticated' }); // ✅ ADDED

    const orders = await Order.find({ userId })
      .populate('products.productId', 'title price') // ✅ MODIFIED: match products array in model
      .sort({ createdAt: -1 });

    console.log('Fetched Orders:', orders);

    if (!orders.length) return res.status(404).json({ error: 'No orders found' });

    return res.status(200).json({ data: orders });
  } catch (error) {
    console.error('Get User Orders Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// -------------------- Get Total Sales --------------------
const totalSales = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders.length) return res.status(404).json({ error: 'No orders found' });

    const total = orders.reduce((acc, order) => acc + order.totalPrice, 0); // ✅ MODIFIED: use totalPrice

    return res.status(200).json({ data: { totalSales: total } });
  } catch (error) {
    console.error('Total Sales Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// -------------------- Update Order Status --------------------
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });

    return res.status(200).json({ message: `Order status updated to ${status}`, order: updatedOrder });
  } catch (error) {
    console.error('Update Order Status Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addOrder,
  deleteOrder,
  viewAllOrders,
  getUserOrders,
  totalSales,
  updateOrderStatus,
};
