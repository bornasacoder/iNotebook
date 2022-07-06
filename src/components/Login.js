import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();
      const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:4000/api/auth/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json)
       if(json.success){
        // save the auth token redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
          props.showAlert("Logged in successfully", "success")
       }else{
          props.showAlert("Invalid Details", "danger")
            
       }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='py-4 my-3'>
        <h3 className='py-3 font-italic'> Login to use iNotebook </h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" name='email' id="email" onChange={onChange} aria-describedby="emailHelp"/>
                <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
            </div>
            <button type="submit"  className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login