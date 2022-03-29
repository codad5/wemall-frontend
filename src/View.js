import {useState, useEffect}from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
function View() {
    async function fetchData() {
        // You can await here
        const response = await axios.get('http://localhost/wemall/api/product/detail/' + navigateP.get('product'))
            .then((response) => {
                // console.log(response)
                return response;

            })
            .catch((e) => console.log(e));
        // ...retur
        // console.log(response)
        return new Promise(resolve => {
            return resolve(response);
        });
    }
    const navigate = useNavigate();

    const navigateP = new URLSearchParams(useLocation().search);
    const [productid, setProductId] = useState(navigateP.get('product'))
    const [product, setProduct] = useState(async () => await fetchData());
    const [productError, setProductError] = useState(true);
    const loadData = async () =>{
        axios.get('http://localhost/wemall/api/product/detail/' + navigateP.get('product'))
            .then((response) => {
                console.log(response)
                return response;

            })
            .catch((e) => console.log(e))
    }
    
    useEffect(async () => {
        
        
        setProduct(await fetchData());
        console.log(await fetchData());
        if (product) {
            console.log('pi', product)
        }
    
       
    }, [])
    console.log(productid);
    if (productid == null) navigate(`/home`);
    
console.log(product)
  return (
      
    <div>
          {/* {product.product_name} */}
    </div>
  )

    


}

export default View