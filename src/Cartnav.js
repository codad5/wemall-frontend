import {useState, useEffect} from 'react';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { BaseUrl, setDiscount, fetchData, getStorage, deleteStorage } from './components/BaseUrl';


export default function Cartnav(props){
    const [cartItemArray, setCartItemArray] = useState([]);
    const [deleted, setDelete] = useState(true);
    const [cartopened, setCartopened] = useState(props.opened)
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
        setCartopened(props.opened)
    }, [props.opened])
    
    
    
    return (
        <aside className="cart-container" style={cartopened ? {left:0} : {left:"-100%"}}>
            
            <div className="cart-header">
                Cart
                <div class="cartClose" onClick={() => setCartopened(!cartopened)}>
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
    )
}