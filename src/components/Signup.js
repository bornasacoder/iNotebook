import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"", password:"", cpassword:""})
  let navigate = useNavigate();
    const handleSubmit = async (e)=>{
      e.preventDefault();
      const {name, email, password} = credentials;
      const response = await fetch("http://localhost:4000/api/auth/createuser",{
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify({name, email, password})
      });
      const json = await response.json()
      console.log(json);
      if(json.success){
          // save the auth token redirect
          localStorage.setItem('token', json.authtoken);
          navigate("/");
          props.showAlert("Account created successfully", "success")

      }else{
          props.showAlert("Invalid Credentials", "danger")
      }
  }
  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (

    <div className='container my-3 py-4'>
      <h3 className='font-italic py-3'> Create an account to use iNotebook</h3>
            <form onSubmit={handleSubmit} className="my-3">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Name</label>
              <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
              <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password"> Password</label>
              <input type="password" className="form-control" name='password' id="password" onChange={onChange} required minLength={5} />
            </div>
            <div className="form-group">
              <label htmlFor="cpassword">Confirm Password</label>
              <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} required minLength={5} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
    </div>
  )
}

export default Signup