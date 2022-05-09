import React, {useState, useEffect} from 'react'
import { SignupController, LoginController } from './components/BaseUrl'
import { useNavigate } from 'react-router-dom';


export function Signup(){
    const [name, SetName] = useState("");
    const [tel, SetTel] = useState(0);
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
    let navigate = useNavigate();

    const signUpdata = {
        name: name,
        phone: tel,
        email:email,
        password:password
    }
    
    return (
        <section>
            <h2>SIGNUP</h2>

            <form method="POST" onSubmit={async (e)=> {
                e.preventDefault();
                let signupDetails = await SignupController(signUpdata);
                alert(signupDetails.message)

                console.log(signupDetails);
                if(!signupDetails.error){
                    let LoginDetails = await LoginController({username: email, password:password});
                    alert(LoginDetails.message)
                    navigate("/checkout")
                }

            }}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter name" onChange={(e) => {
                    SetName(e.target.value)
                    // console.log(signUpdata)
                }}/>
                <label htmlFor="number">Number</label>
                <input type="tel" id="number" placeholder="Enter number" onChange={(e) => SetTel(e.target.value)}/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter Email" onChange={(e) => SetEmail(e.target.value)}/>
                <label htmlFor="loginpassword">Password</label>
                <input type="password" id="loginpassword" placeholder="Enter password" onChange={(e) => SetPassword(e.target.value)}/>
                <button type="submit">SIGNUP</button>
            </form>
        </section>
    )
}
export function Login(){
    const [name, SetName] = useState("");
    const [tel, SetTel] = useState(0);
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
    let navigate = useNavigate();

    const Logindata = {
        username: name,
        password: password
    }
    return (
        <section>
            <h2>LOGIN</h2>
            <form method="POST" onSubmit={async (e)=> {
                e.preventDefault();
                let LoginDetails = await LoginController(Logindata);
                console.log(LoginDetails);
                alert(LoginDetails.message)

                if (!LoginDetails.error) {
                    // let LoginDetails = await LoginController({ username: email, password: password });
                    
                    navigate("/checkout")
                    // console.log("worth")
                }

            }}>
                <label htmlFor="username">Email/Phone</label>
                <input type="email" id="username" placeholder="Enter Email" onChange={(e) => SetName(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" onChange={(e) => SetPassword(e.target.value)}/>
                <button type="submit">LOGIN</button>
            </form>
        </section>

    )
}
