import {useState, useEffect} from 'react'
import { SignupController } from './components/BaseUrl'

export function Signup(){
    const [name, SetName] = useState("");
    const [tel, SetTel] = useState(0);
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
    const signUpdata = {
        name: name,
        phone: tel,
        email:email,
        password:password
    }
    
    return (
        <section>
            <form method="POST" onSubmit={(e)=> {
                e.preventDefault();
                SignupController(signUpdata)

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
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" onChange={(e) => SetPassword(e.target.value)}/>
                <button type="submit">SIGNUP</button>
            </form>
        </section>
    )
}
export function Login(){
    return (
        <section>
            <div>Subscribe</div>
        </section>

    )
}
