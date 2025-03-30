const Stripe=require('stripe')

const stripe=new Stripe(process.env.STRIPE_SECRET)
const PaymentFunction=async(req,res)=>{
    try {
        
        const{products}=req.body
        console.log("products",req.body)

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
            success_url:`${process.env.FRONTEND_URL}/payment/success`,
            cancel_url:`${process.env.FRONTEND_URL}/payment/failed`,
    
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