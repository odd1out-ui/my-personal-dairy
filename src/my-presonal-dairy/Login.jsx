
import { useNavigate } from "react-router-dom"
import { userCredentials } from "./store/UserCredentials";

import { useRef } from "react";
import './styles.css'

const Login=({returnAuthentication})=>{
    const navigate=useNavigate();

    const refName=useRef("")
    const refSecretCode=useRef(0)
    const checkAuthention=()=>{
        
    
    
        if(refName.current.value===userCredentials.name && refSecretCode.current.value===userCredentials.secretcode)
        
        {
        
            navigate('/home')
        }
        else{
            alert('Wrong name or Secret Code')
            
        }

    }
    return(
        <div className="loginPage">
            
            <div className="loginform  p-3  mb-2 bg-dark text-white border border-primary-white rounded-3 ">
            <div class="mb-3 ">
            <label for="exampleFormControlInput1 " class="form-label inputbox">Name
            <input type="email" class="form-control " id="exampleFormControlInput1" placeholder="abc" ref={refName}/>
            </label>
            </div>
            
            <div class="mb-3 ">
            <label for="exampleFormControlTextarea1" class="form-label">Secret Code</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="123" ref={refSecretCode}/>
            <p className="footer">{'Enter Name:abc and Secret Code:123'}</p>
            </div>
            <button class="btn btn-light" onClick={checkAuthention}>Open Dairy</button>

            </div>

                        



        </div>
    )
}
export default Login;