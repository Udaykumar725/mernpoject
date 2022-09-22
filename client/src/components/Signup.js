
import {useHistory } from 'react-router-dom';
import React,{useState} from 'react'

const Signup = () => {

  const history= useHistory();

    const [user, setUser] = useState({
        name:"", email:"", phone:'', work:"", password:'', cpassword:""
    });
let name, value;
const handleInputs=(e)=>{
    console.log(e);
    name=e.target.name;
    value=e.target.value;

    setUser({...user, [name]:value});
}

 const postData= async (e)=>{
   e.preventDefault();
    
   const {name, email, phone, work, password, cpassword}  = user;

   const res =await fetch("/register",{
     method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify
    ({
      name, email, phone, work, password, cpassword
    })
  });
  const data= await res.json();
  if(data.status=== 422 ||!data ){
    window.alert("Invalid Credential")
    console.log("Invalid Credential")
  }else{
    window.alert("Registation Successfull")
    console.log("Registation Successfull")

    history.push("/login");
  }
 }

return (
<>
<div>
<form method="POST" className='container-sm mx-5 my-5'>
  <div  className="textcenter p-3 mb-2 bg-primary text-white">
  <h4>Register</h4>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Name</label>
    <input type="text" name='name' autoComplete='off' value={user.name} onChange={handleInputs} className="form-control" />
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" name='email' autoComplete='off' value={user.email} onChange={handleInputs} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Phone</label>
    <input type="text" name='phone' autoComplete='off' value={user.phone} onChange={handleInputs}  className="form-control"  />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Work</label>
    <input type="text" name='work' autoComplete='off' value={user.work} onChange={handleInputs}  className="form-control"  />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' autoComplete='off' value={user.password} onChange={handleInputs} className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
    <input type="password" name='cpassword' autoComplete='off' value={user.cpassword} onChange={handleInputs}  className="form-control" id="exampleInputPassword1" />
  </div>
   <button type="submit" className="btn btn-primary" onClick={postData}>Submit</button>
</form>
</div>
</>
)
}

export default Signup
