const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Match User model name
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Match Product model name
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        title :{
          type:String,
          required:true

        }
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// **Method to Calculate Total Price**
cartSchema.methods.calculateTotalPrice = async function () {
  this.totalPrice = this.products.reduce((total, product) => total + product.price * product.quantity, 0);
  return this.totalPrice;
};

// **Export Model**
module.exports = mongoose.model("Cart", cartSchema);
