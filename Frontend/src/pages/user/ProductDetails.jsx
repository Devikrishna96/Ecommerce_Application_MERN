import React from "react"
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";


export const ProductDetails=()=>{

    const { id } = useParams();
    const [productDetails,loading,error] =useFetch(`/product/productDetails/${id}`)
return(
    <div>
        <h1>Product Details</h1>
        <div>
            <h2>{productDetails?.title}</h2>
            <p>{productDetails?.description}</p>
        </div>
        <div>
            <img src={productDetails?.image} alt= "Product image" />
            <h2>Price: {productDetails?.price}</h2>

        </div>
        <button className="btn btn-success" >Add to Cart</button>
    </div>
)
}