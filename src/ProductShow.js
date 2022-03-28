import {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';

function ProductShow(props) {
  let navigate = useSearchParams();
  // console.log(useSearchParams())
  const [products, setProducts] = useState([]);
  const [viewProduct, setViewProduct] = useState();
  useEffect(() => {
    axios.get('http://localhost/wemall/api/list/'+(props.param || 'category/all'))
    .then((response) => {
      // console.log(response)
      setProducts(response.data.data)
    })
    .catch((e) => console.log(e))

  }, [])
  const setDiscountPer = (product) => {
    if(product.product_discount > 0) {

      let sign = "%", text = "";
      
      switch(product.discount_method){
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
        <span className="product-discount-tag"> {text} </span>
      )
    }
  }

  const setDiscount = (product) => {
    if (product.product_discount > 0) {

    let text = "";
    switch (product.discount_method) {
      case 'percentage':
        text = `${product.product_price - ((product.product_discount / 100) * product.product_price).toFixed(2) }`;
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
      <span className="product-discount-price">${text}</span>
    )
    }

  }

  const postRedirect = () => {
    navigate(URLSearchParams)
  }
  
  return (
    <section className="product-show">
      {products.map((product) => <div key={product.product_id_private} className="product-container">
        <div className="product-image" style={{ background: `url(${product.product_image1})`}}>

        </div>
        <div className="product-details">
          <div className="product-name" onClick={(e) => {
            e.preventDefault();
            setViewProduct(product.product_id);
            postRedirect();
          }}> {product.product_name}</div>
          <div className="product-price"> {setDiscount(product)}
            ${product.product_price} </div>
        </div>
        {setDiscountPer(product) }
      </div>)}
      {/* <div className="product-container">
        <div className="product-image">

        </div>
        <div className="product-details">
          <div className="product-name"> T-shirt summer Vibes</div>
          <div className="product-price"> <span className="product-discount-price">$12.99</span>
            $89.99 </div>
        </div>
        <span className="product-discount-tag"> 30%</span>
      </div>
      <div className="product-container">
        <div className="product-image">

        </div>
        <div className="product-details">
          <div className="product-name"> T-shirt summer Vibes</div>
          <div className="product-price">
            $89.99 </div>
        </div>
      </div>
      <div className="product-container">
        <div className="product-image">

        </div>
        <div className="product-details">
          <div className="product-name"> T-shirt summer Vibes</div>
          <div className="product-price">
            $89.99 </div>
        </div>
      </div>
      <div className="product-container">
        <div className="product-image">

        </div>
        <div className="product-details">
          <div className="product-name"> T-shirt summer Vibes</div>
          <div className="product-price">
            $89.99 </div>
        </div>
      </div> */}
     

    </section>
  )
}

export default ProductShow