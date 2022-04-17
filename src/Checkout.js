import {useState, useEffect} from 'react';
import {Signup, Login} from './Login'
import Header from "./Header"
import { useNavigate, useLocation } from 'react-router-dom';


function Checkout(){
    const [headerKey, setHeaderKey] = useState(Math.random())
    const [loggedin, SetLogin] = useState(localStorage.getItem('loggedUser') || false)
    const history = useLocation()
    let navigate = useNavigate();
    useEffect(() => {
        SetLogin(localStorage.getItem('loggedUser') || false)
    }, [history])
    if (loggedin == false) {
        navigate("/login");
    }
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