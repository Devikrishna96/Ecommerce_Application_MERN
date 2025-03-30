import React, { useEffect, useState } from 'react'
import { Cards } from '../../components/user/Cards';
import { listProducts } from '../../services/userServices';

export const Products = () => {
    // const [productList,loading,error]=useFetch("/product/listproducts");
    // if(loading){
    //     return <Skeletons/>;   
    // }
const [products,setProducts]=useState([])
    useEffect(()=>{
     
      listProducts().then((res)=>{
        console.log(res.data);
        setProducts(res.data.data);
      })
      .catch((err)=>
      {
        console.log(err)
      })
    },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
  { products && products.map((product,i)=>(
    <Cards key={i} product={product} />
   ))
    }

    </div>
  )
}
