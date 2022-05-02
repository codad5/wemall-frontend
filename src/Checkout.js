import {useState, useEffect} from 'react';
import {Signup, Login} from './Login'
import { usePaystackPayment } from "react-paystack"
import Header from "./Header"
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { fetchData, getStorage, deleteStorage, setDiscount, sumItemArray, submitOrder, invalidLogin, initiatePayment } from "./components/BaseUrl"


function Checkout(props){
    const [headerKey, setHeaderKey] = useState(Math.random())
    const [loggedin, SetLogin] = useState(localStorage.getItem('loggedUser') || false)
    const [cartItemArray, setCartItemArray] = useState([]);
    const [deleted, setDelete] = useState(true);
    const [totalPrice, setTotal] = useState(sumItemArray(cartItemArray));
    const [initiatePay, setPayment] = useState(false)
    const orderPost = {
        user: loggedin,
        totalPrice: totalPrice,
        cartItem: cartItemArray,
        payment_method: 'payStack'
    }
    const loginDetail = JSON.parse(loggedin)?.data
    // console.log(JSON.parse(loggedin).data);
    const payStackinfoo = {
        firstname: loginDetail?.name,
        lastname:"",
        phone: loginDetail?.phone,
        email:loginDetail?.email,
        amount:"",
        reference:"",
        metadata : {},
        currency : 'NGN',
        channels:"",
        label : '',
        plan : '',
        quantity : '',
        subaccount : '',
        transaction_charge : 0,
        bearer : 'account',
        split:"",
        split_code:"",
    }

    

    const history = useLocation()
    let currentPath = history.pathname
    let navigate = useNavigate();
    useEffect(() => {
        
            let newloginState = localStorage.getItem('loggedUser') || false
        // console.log(currentPath, newloginState);
            if (newloginState === false && currentPath != "/login") {
                SetLogin(false)
                navigate("/login");
            }
            else if(newloginState != false) {
                SetLogin(newloginState)
                navigate("/checkout");

            }
            // return newloginState
        
        
    }, [currentPath])

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

        

        
        setTotal(sumItemArray(cartItemArray))

    }, [cartItemArray])
    useEffect(() => {

        

        getStorage().forEach(item => setCartItem(item));
        setTotal(sumItemArray(cartItemArray))

    }, [deleted])
    
    
    return (
        <div className="checkout-main">
            <Header color='var(--main-black)' orderNumber="" key={headerKey}></Header>
            <main style={{paddingTop: '170px' }}>       

            {
                loggedin === false ? 
                <section>
                    <Signup></Signup>
                    <Login></Login>
                        </section> : <div className="cart-item-body">
                            {
                                cartItemArray.length > 0 ? (cartItemArray?.map((item) => (<div key={item.data.product_id} className="cart-item-box">
                                    <div className="cart-productImage" style={{ backgroundImage: `url(${item.data.product_image1})` }}></div>
                                    <div className="cart-item-description">
                                        <div className="cart-product-name">
                                            {item.data.product_name}
                                        </div>
                                        <div className="cart-item-prices">
                                            <span>${setDiscount(item.data, true)}</span> <span className="cart-item-total">${setDiscount(item.data, true) * item.quantity}</span>
                                        </div>
                                        <div className="cart-item-action-btns">
                                            <Link to={'../../../view/' + item.data.product_id
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
                                    
                                </div>)))  : "No Item On Cart"


                            }
                            {
                                cartItemArray.length > 0 ? <div className="checkout-payment-bar">
                                        <ul>
                                            {
                                                cartItemArray.map((item) => <li key={item.data.product_id}>{item.data.product_name}</li>)
                                            }
                                        </ul>
                                    <button onClick={async () => {
                                        let OrderData  = await submitOrder({
                                        login_detail: loggedin,
                                        cart:{
                                            items: cartItemArray
                                        },
                                        payment_method:"payStack"
                                    }

 
                                    
                                    )
                                    console.log(OrderData)
                                    if(OrderData.error !== false && OrderData.message == 'Some Bad Jwt'){
                                        invalidLogin()
                                        navigate("/login")
                                        console.log("faliure')")
                                    }
                                    else if(OrderData.error == false){
                                        console.log("here")
                                        initiatePayment('payStack', payStackinfoo)
                                    }

                                    
                                }}>
                                        PURCHASE $ {totalPrice}
                                        </button>
                                    </div> : ""
                            }

                        </div>
            }
                {/* <usePaystackPayment></usePaystackPayment> */}
            </main>
            
        </div>
    )
}

export default Checkout