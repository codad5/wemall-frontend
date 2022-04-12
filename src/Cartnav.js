import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import BaseUrl from './components/BaseUrl';


export default function Cartnav(props){
    const [cartItemArray, setCartItemArray] = useState([]);
    let i = 0;
    const getStorage = () => {
        if (JSON.parse(localStorage.getItem("orderedProduct")) == undefined) return []
        return JSON.parse(localStorage.getItem("orderedProduct")).items
    }
    
    async function fetchData(id) {
        // You can await here
        const base = BaseUrl();
        let url = base + 'product/detail/' + id;
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
            return resolve(response.data);
        });
    }
    const getCartItem = async (item) => {
        let newArr = cartItemArray;
        let data = await fetchData(item.product_id);
        
        const newLocal = cartItemArray.filter((value) => {
            return value.data.product_id !== data.data.product_id;
        });
        // console.log(data);

        // console.log(getStorage().length , cartItemArray.length)
        
        i++;
        
        return data;
        
        

            // console.log(cartItemArray, data, item);
        
        return data;

    }
    
    
    useEffect(() => {
        async function start(){
            let items = getStorage();
            this.cartitemArray = [];
            getStorage().forEach(async (item) => {
                // console.log(item)
                let me = await fetchData(item.product_id);
                this.cartitemArray.push(me)
            });
            setCartItemArray(this.cartitemArray);
            console.log(this.cartItemArray)

            return this.cartitemArray;
            
        }
        start();
        // setCartItemArray(start());

    }, [])
    
    
    return (
        <aside className="cart-container">
            <div className="cart-header">
                Cart

            </div>
            <div className="cart-item-body">
                {
                    cartItemArray.length > 0 ? (cartItemArray?.map((item) => (<div key={item.product_id}className="cart-item-box">
                        <div className="cart-productImage"></div>
                        <div className="cart-item-description">
                            <div className="cart-product-name">
                                {item.data.product_name}
                            </div>
                            <div className="cart-item-prices">
                                <span>$100</span> <span className="cart-item-total">$1000</span>
                            </div>
                            <div className="cart-item-action-btns">
                                <Link to={{
                                    pathname: '../view/hiagdfiub'
                                }}>Edit</Link>
                                <button type="submit">
                                    Delete
                                </button>

                            </div>
                            <span className="cart-item-badge">10</span>
                        </div>
                    </div>))) : "No Item On Cart"

                    
                }
                
            </div>
            <div className="car-nav-checkout-cnt">
                <Link className="cart-nav-checkout" to={{
                    pathname: "hbiabfeib"
                }}>CHECKOUT</Link>
            </div>
        </aside>
    )
}