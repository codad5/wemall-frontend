import {useState, useEffect} from 'react';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { BaseUrl, setDiscount, fetchData, getStorage, deleteStorage } from './components/BaseUrl';


export default function Cartnav(props){
    const [cartItemArray, setCartItemArray] = useState([]);
    const [linkStyle, setLinkStyle] = useState({ color: props.color || 'inherit' });

    const [deleted, setDelete] = useState(true);
    const [cartopened, setCartopened] = useState(false)
    const [orderedItem, setOrderedItem] = useState(getStorage())
    const [orderedProduct, setOrderProduct] = useState(orderedItem.length ?? 0)
    // const [cartopen, setcartOpen] = useState(false)

    let i = 0;
    
    
    

    const setCartItem = async (item) => {
        
        let data = await fetchData(item.product_id);
        data.quantity = item.quantity;
        
        const newLocal = cartItemArray.filter((value) => {
            return value.data.product_id !== data.data.product_id;
        });
       
        
        setCartItemArray(prevState => ([...prevState.filter((value) => {
            return value.data.product_id !== data.data.product_id;
        }), data]));
        
       

    }
    const deleteCartItem = (id) => {
        let newCart = cartItemArray.filter((v) => {
            return v.data.product_id !== id;
        });

        setCartItemArray(newCart)
    }
    
    
    useEffect(() => {
        
        // setCartItemArray(start());
        
        getStorage().forEach( item => setCartItem(item));
        
    }, [deleted])
    useEffect(() => {
        // setCartopened(props.opened)
    }, [props.opened])
    
    
    
    return (
        <div>
            <div className="header-cart_icon" onClick={() => {
                setCartopened(!cartopened)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                        <g id="noun_cart_2102832_4_" data-name="noun_cart_2102832 (4)" transform="translate(-6 -6)">
                            <path style={{fill:"inherit"}} id="Path_5" data-name="Path 5" d="M6.917,7.833H8.448l2.295,10.355a3.289,3.289,0,0,0-1.871,3.042,3.133,3.133,0,0,0,2.962,3.275H23.988a.917.917,0,1,0,0-1.833H11.833A1.332,1.332,0,0,1,10.7,21.231a1.332,1.332,0,0,1,1.128-1.442H23.988a.917.917,0,0,0,.863-.606l3.1-8.591a.917.917,0,0,0-.863-1.227H10.665l-.586-2.646A.916.916,0,0,0,9.184,6H6.917a.917.917,0,0,0,0,1.833ZM25.779,11.2l-2.435,6.758H12.568l-1.5-6.758H25.779Z"/>
                            <path style={{fill:"inherit"}} id="Path_6" data-name="Path 6" d="M19.261,50a.917.917,0,0,0,0,1.833h1.164a.917.917,0,1,0,0-1.833Z" transform="translate(-6.687 -23.833)"/>
                            <path style={{fill:"inherit"}} id="Path_7" data-name="Path 7" d="M37.713,50a.917.917,0,0,0,0,1.833h1.164a.917.917,0,1,0,0-1.833Z" transform="translate(-16.682 -23.833)"/>
                        </g>
                    </svg>
                    <span className="header-cart_icon_number">{orderedProduct}</span>
                </div>
        <aside className="cart-container" style={cartopened ? {left:0} : {left:"-100%"}}>
            
            <div className="cart-header">
                Cart
                <div className="cartClose" onClick={() => setCartopened(!cartopened)}>
                    {/* <AccessAlarm> Hi </AccessAlarm>  */}

                    close
                    {/* <svg data-testid="AccessAlarm"></svg> */}
                </div>
            </div>
            <div className="cart-item-body">
                {
                    cartItemArray.length > 0 ? (cartItemArray?.map((item) => (<div key={item.data.product_id}className="cart-item-box">
                        <div className="cart-productImage" style={{ backgroundImage: `url(${item.data.product_image1})`}}></div>
                        <div className="cart-item-description">
                            <div className="cart-product-name">
                                {item.data.product_name}
                            </div>
                            <div className="cart-item-prices">
                                <span>${setDiscount(item.data, true)}</span> <span className="cart-item-total">${setDiscount(item.data, true) * item.quantity}</span>
                            </div>
                            <div className="cart-item-action-btns">
                                <Link to={'../../../view/'+item.data.product_id
                                }>Edit</Link>
                                <button type="button" onClick={(e) => {
                                    e.preventDefault();
                                    deleteStorage(item.data.product_id)
                                    deleteCartItem(item.data.product_id)
                                    
                                }}>
                                    Delete
                                </button>

                            </div>
                            <span className="cart-item-badge">{item.quantity}</span>
                        </div>
                    </div>))) : "No Item On Cart"


}
                
            </div>
            <div className="car-nav-checkout-cnt">
                <Link className="cart-nav-checkout" to={"../../../checkout"}>CHECKOUT</Link>
            </div>
        </aside>
</div>
    )
}