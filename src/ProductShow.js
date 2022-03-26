import {useState} from 'react'

function ProductShow(props) {
  
  const [prodocts, setProducts] = useState([]);
  return (
    <section className="product-show">
      <div className="product-container">
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
      </div>
     

    </section>
  )
}

export default ProductShow