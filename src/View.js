import {useState, useEffect}from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
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
    const [product, setProduct] = useState(false)
    const [mainImage, setMainImage] = useState(product);
    useEffect(async () => {
        let data = await fetchData();
        console.log(data.data.error)
        if(!data.data.error){
            
            setMainImage(data.data.data.product_image1);
            
        }
        setProduct(data)
        
        
    }, []);
    
  return (
      
    <div>
          <Header background='var(--main-black)'></Header>
          <main style={{paddingTop: '70px'}}>
            <section className="product_show-hero">

            {product  ? (<div>{
                      product.data.error ? (
                            <div className="product_show-hero-error_msg">Error :
                                    {product.data.message} 
                            </div>) : (
                            <div className="product_show-layout_cnt">
                                
                                <div className="product_show-layout-header"></div>
                                <div className="product_show-layout_all_image"></div>
                                  <div className="product_show-main-pic"><img className="image" src={mainImage}/></div>
                            </div>)
                        }
                        </div>) : (
                        <div className="product_show-layout_cnt">
                            <div className="product_show-layout-header"></div>
                            <div className="product_show-layout_all_image"></div>
                            <div className="product_show-main-pic"></div>
                            Loading
                        </div>)}
            </section>
          </main>
    </div>
  )

    


}

export default View