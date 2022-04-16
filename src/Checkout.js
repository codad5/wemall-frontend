import {useState, useEffect} from 'react';
import {Signup, Login} from './Login'
import Header from "./Header"

function Checkout(){
    const [headerKey, setHeaderKey] = useState(Math.random())
    const [loggedin, SetLogin] = useState(localStorage.getItem('userInfo') || false)
    return (
        <div>
            <Header color='var(--main-black)' orderNumber="" key={headerKey}></Header>
            <main style={{paddingTop: '170px' }}>       

            {
                loggedin === false ? 
                <section>
                    <Signup></Signup>
                    <Login></Login>
                </section> : 'you are logged in'
            }
            </main>
            
        </div>
    )
}

export default Checkout