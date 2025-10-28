const Stripe=require('stripe')
const Order = require('../Models/orderModel'); 


const stripe=new Stripe(process.env.STRIPE_SECRET)
const PaymentFunction=async(req,res)=>{
    try {
        
        const{products}=req.body
        console.log("products",req.body)

        const totalAmount = products.reduce(
            (acc, p) => acc + p.productId.price * (p.quantity || 1),
            0
        );

        const newOrder = await Order.create({
            user: userId,           // user reference
            products,               // products array
            amount: totalAmount,    // total price
            status: 'pending',      // initial status
        });

        const lineItems=products.map((product)=>({
            price_data:{
                currency :'inr',
                product_data :{
                    name:product.title,
                    images:[product.productId.image]
                },
                unit_amount:Math.round(product.productId.price*100),
            },
            quantity:product.quantity || 1
        }))

        const session=await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:lineItems,
            mode:'payment',
            success_url:`${process.env.FRONTEND_URL}/payment/success?orderId=${newOrder._id}`,
            cancel_url:`${process.env.FRONTEND_URL}/payment/failed`,
            metadata: { orderId: newOrder._id.toString() }, 

    
        })
        return res.json({ success :true,sessionId: session.id });

    } catch (err) {
        console.log(err)
        res.status(err.status || 500).json({error:err.message || "Internal server error"})
        
    }
}



module.exports={
    PaymentFunction
}