import {useState, useEffect}from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useParams } from "react-router";
import Header from './Header'
import axios from 'axios';
import Footer from './Footer'
import BaseUrl from './components/BaseUrl';
import ProductShow from './ProductShow'
function View() {
    let { id } = useParams();
    // console.log(id)
    const  getStorage = () => {
        if (JSON.parse(localStorage.getItem("orderedProduct")) == undefined) return []
        return JSON.parse(localStorage.getItem("orderedProduct")).items
    }
    async function fetchData() {
        // You can await here
        const base = BaseUrl();
        let url = base+'product/detail/' + id;
        // console.log(url);
        const response = await axios.get(url)
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
    const setDiscountPer = (product) => {
        if (product.product_discount > 0) {

            let sign = "%", text = "";

            switch (product.discount_method) {
                case 'percentage':
                    text = `- ${product.product_discount.toFixed(2) - 0.01}%`;
                    break;
                case 'price_cut':
                    let price = 0;
                    price = (product.product_discount / product.product_price) * 100;

                    text = `- ${price.toFixed(2) - 0.01}%`;
                    break;

                default:
                    return '';
                    break;
            }
            return (
                <span> {text} </span>
            )
        }
    }
    const setDiscount = (product) => {
        if (product.product_discount > 0) {

            let text = "";
            switch (product.discount_method) {
                case 'percentage':
                    text = `${product.product_price - ((product.product_discount / 100) * product.product_price).toFixed(2)}`;
                    // text = text.toFixed(2)
                    break;
                case 'price_cut':
                    let price = 0;
                    price = (product.product_price - product.product_discount);

                    text = `${price}`;
                    break;

                default:
                    return '';
                    break;
            }
            return (
                <span>${text}</span>
            )
        }

    }
    const setOrderQuantity = () => {
        if (getStorage().length > 0) {
            if (getStorage().some((v) => { return v.product_id === productid })) {
                let num = getStorage().filter((v) => {
                    // if (v.product_id === productid) {
                    return v.product_id == productid
                    // }

                });
                return num[0].quantity
            }
        }
        return 0;
    }
    const navigate = useNavigate();
    const navigateP = new URLSearchParams(useLocation().search);
    const [productid, setProductId] = useState(id)
    const [product, setProduct] = useState(false)
    const [mainImage, setMainImage] = useState(product);
    const [orderQuantity, setQuantity] = useState(setOrderQuantity());
    const [orderedProduct, setOrderProduct] = useState(getStorage() ?? [])
    const [headerKey, setHeaderKey] = useState(Math.random())
    useEffect(async () => {
        // setQuantity(3)
        // console.log('hello')
        window.scrollTo(0, 0);
        
        let data = await fetchData();
        // console.log(data.data)
        if(!data.data.error){
            
            setMainImage(data.data.data.product_image1);
            
        }
        // console.log(data);
        setProduct(data)
        setQuantity(setOrderQuantity);
        
        
        
    }, [ProductShow, useParams(), id]);
    const addToCart = () => {
        if (orderQuantity > 0) {

            let newOrder = {
                product_id: productid,
                quantity: orderQuantity
            };
            let newOrderSet = orderedProduct.filter((value) => {
                return value.product_id !== productid;
            });
            let newItems = [...newOrderSet, newOrder];
            console.log(newItems);
            let items = JSON.stringify({
                items: newItems
            });
            localStorage.setItem("orderedProduct", items);
            
            console.log(orderedProduct)
            setHeaderKey(Math.random())
            //   console.log(orderedProduct, localStorage.getItem("orderedProduct"));
        }
    }
    // useEffect(()=> {
        // localStorage.setItem("orderedProduct", orderedProduct);

    // }, [orderedProduct])
    if (productid == null) navigate('/')
  return (
      
    <div>
          <Header color='var(--main-black)' orderNumber="" key={headerKey}></Header>
          <main style={{paddingTop: '70px'}}>
            <section className="product_show-hero">
            {/* to check if the api fetch was ok */}
            {product  ? (<div>{
                // if ok to check if there was an error
                      product.data.error ? (
                        //   if error will return this
                            <div className="product_show-hero-error_msg">Error :
                                    {product.data.message} 
                            </div>) : (
                                // else if no error will return this
                            <div className="product_show-layout_cnt">
                                
                                <div className="product_show-layout-header">
                                    <div className="product_show-categorybox">
                                          <div  className="product_show-Categoryblock ">  {product.data.data.product_gender} ></div>
                                          {product.data.data.product_category.map((cat, i) => {
                                              
                                              if(i < 4 && cat.trim().length > 0){ 
                                                  return (
                                                  <div key={i} className="product_show-Categoryblock" id={i}> {cat} > </div>
                                                  ) 
                                                
                                                }
                                                return '';
                                                  })}
                                          <div  className="product_show-Categoryblock product_show-product-name">  {product.data.data.product_name}</div>
                                    </div>
                                    <div className="product_show-infoBox">
                                          
                                    </div>
                                </div>
                                <div className="product_show-layout_all_image">
                                      <img src={product.data.data.product_image1} alt={product.data.data.product_category.join(',')}  onClick={(e) => {
                                          setMainImage(e.target.src)
                                      }}/>
                                      <img src={product.data.data.product_image2} alt={product.data.data.product_category.join(',')}  onClick={(e) => {
                                          setMainImage(e.target.src)
                                      }}/>
                                      <img src={product.data.data.product_image3} alt={product.data.data.product_category.join(',')}  onClick={(e) => {
                                          setMainImage(e.target.src)
                                      }}/>
                                      <img src={product.data.data.product_image4} alt={product.data.data.product_category.join(',')}  onClick={(e) => {
                                          setMainImage(e.target.src)
                                      }}/>
                                      <img src={product.data.data.product_image1} alt={product.data.data.product_category.join(',')}  onClick={(e) => {
                                          setMainImage(e.target.src)
                                      }}/>
                                </div>
                                  <div className="product_show-main-pic"><img className="image" src={mainImage} alt={product.data.data.product_category.join(',')}/></div>
                                  <div className="product_show-description-cnt">
                                      <div className="product_show-description-header">
                                          {
                                              (product.data.data.product_discount > 0) ? (<div className="product_show-discount-badge">{setDiscountPer(product.data.data)}</div>) : (<div> </div>)
                                          

                                              
                                          }
                                      </div>
                                      <div className="product_show-main-details">
                                          <div className="product_show-product_details-name">{product.data.data.product_name}</div>
                                          <div className="product_show-product-prices">
                                              <span className="product_show-cut-price">
                                                  {(product.data.data.product_discount > 0) ? setDiscount(product.data.data) : ''}
                                              </span>
                                              <span className="product_show-main-price">${product.data.data.product_price}</span>
                                          </div>
                                          <div className="product_show-product_size">
                                              <label htmlFor="priceTag">SIZE</label><span id="priceTag" className=" show-size">: {product.data.data.product_size}</span>
                                          </div>
                                          <form className="product_show-order-product" onSubmit={(e) => {
                                              e.preventDefault();
                                              addToCart();

                                              
                                            }}>
                                              <div className="product_show-order-quantity-wrapper">
                                                  <button className="increase-quantity minus" type="button" onClick={() => { if (orderQuantity > 0) {setQuantity(orderQuantity - 1)}}}>-</button>
                                                  <input value={orderQuantity} min="0" max={orderQuantity} type="number" onChange={(e) => {setQuantity(e.target.value)}}/>
                                                  <button className="increase-quantity plus" type="button" onClick={() => { if (orderQuantity < product.data.data.product_quantity ){setQuantity(orderQuantity + 1)}}}>+</button>

                                              </div>
                                              <button type="submit"> ADD TO CART</button>
                                          </form>
                                      </div>
                                  </div>
                            </div>)
                        }
                        </div>) : (
                            // will return this if api fetch failed or is still loading
                          <div className="product_show-layout_cnt ">
                            <div className="product_show-layout-header">
                                <div className="product_show-categorybox">
                                </div>
                                <div className="product_show-infoBox">
                                      
                                </div>
                            </div>
                              <div className="product_show-layout_all_image ">
                                  <div className="shimmer img"></div>
                                  <div className="shimmer img"></div>
                                  <div className="shimmer img"></div>
                              </div>
                            <div className="product_show-main-pic">
                                  <div className="shimmer image"></div>
                            </div>
                            <div className="product_show-description-cnt">
                                <div className="product_show-description-header">
                                      <div className=" emp-price shimmer product_show-discount-badge-shimmer"></div>
                                </div>
                                <div className="product_show-main-details">
                                    <div className="product_show-product_details-name"><span className="shimmer emp-price"></span></div>
                                    <div className="product_show-product-prices">
                                        <span className="product_show-cut-price shimmer emp-price"></span>
                                        <span className="product_show-main-price shimmer emp-price"></span>
                                    </div>
                                    <div className="product_show-product_size">
                                          <span className="shimmer emp-price show-size"></span>
                                    </div>
                                    <div className="product_show-order-product">
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>)}
            </section>
            
              <ProductShow heading="you may also like"></ProductShow>
          </main>
          <Footer></Footer>
    </div>
  )

    


}

export default View