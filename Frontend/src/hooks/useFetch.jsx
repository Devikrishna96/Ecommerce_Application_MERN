import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch =(url)=>{
    const [data,setData]=useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchData=async()=>{
        try {
            const response=await axiosInstance({method :"GET",url :url});
            console.log(response)
      setData(response?.data?.data || response?.data); 
            setLoading(false);
        } catch (err) {
            console.error("Fetch Error:", err);
                        setError(err)
        }
        finally {
            setLoading(false); 
        }
    }
    useEffect(()=>{
        fetchData();
    },[url]);
    return [data,loading,error];
}