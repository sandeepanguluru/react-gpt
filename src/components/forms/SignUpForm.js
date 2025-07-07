// import React, { useState } from "react";
// export const SignupForm = () =>{
//     const [name,setName]=useState("");
//     const [email,setEmail]=useState("");
//     const [error,setError]=useState("");
//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         if(!email || !name){
//         setError("Required")
//         return;
//     }
//     if(!email.includes('@')){
//         setError("email incorrect")
//         return;
//     }
//     setError("");
//     alert(`entered email is \n${name} \n${email}`)
//     setEmail("")
//     setName("");
//     }

    

//     return (
//         <>
//         <form onSubmit={handleSubmit}>
//         <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
//         <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
//         {error && <p style={{color:'red'}}>{error}</p>}
//         <button type="submit">Submit</button>
//         </form>
//         </>
//     )
// }

import React, { useState } from "react";
export const SignupForm=()=>{
    const [data,setData]=useState({
        name:"",
        email:""
    })
    // const [name,setName]=useState("");
    // const [email,setEmail]=useState("");
    const [error,setError]=useState("")
    const {name,email}=data;
    const handleChange=(e)=>{
        const{name,value}=e.target
        setData({...data,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!name.trim() || !email.trim()){
            setError("required");
            return;
        }
        if(!email.includes("@")){
            setError("invalid email")
            return;
        }
        alert(`enter name is ${name}\n and email is ${email}`)
        setData({name:"",email:""})
       
        setError("")
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} onChange={handleChange}/>
        <input type="text" name="email" value={email} onChange={handleChange}/>
        <button type="submit">submit</button>
        {error && <p>{error}</p>}
        </form>
        </>
    )
}