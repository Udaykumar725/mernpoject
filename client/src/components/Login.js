import React,{useState} from 'react';
import { useHistory } from 'react-router';


const Login = () => {

       const history= useHistory();
       const [email, setEmail]= useState('');
       const [password, setPassword]= useState('');

       const userLogin= async (e)=>{
           e.preventDefault();

           const res= await fetch('/signin' , {
               method:"POST",
               headers:{
                "Content-Type":"application/json"
               },
               body:JSON.stringify({
                      email,password
               })
           });
           const data= res.json();
           if(data.status === 400 || !data)
           {
               window.alert("Invalid Creadential");
               console.log("Invalid Creadential");
           } else{
            window.alert("Login Successful");
            console.log("Login Successful");

            history.push('/');

        }
       }

    return (
        <>
        <div>
        <form method='POST' className='container-md mx-5 my-5'>
            <div  className="textcenter p-3 mb-2 bg-primary text-white">
                <h4>Login</h4>
            </div>
        <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" 
              className="form-control" 
              id="exampleInputEmail1"
              placeholder='Email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
             aria-describedby="emailHelp" />
           </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" 
              className="form-control"
              placeholder='Password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              id="exampleInputPassword1" />
            </div>
               <button type="submit" 
               onClick={userLogin}
               className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default Login
