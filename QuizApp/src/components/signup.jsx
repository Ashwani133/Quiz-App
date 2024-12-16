import { useState } from "react"
import axios from "axios"

export const Signup = () => {
    const initialvalue = {
        email:"",
        username:"",
        password:""
    }
    const[values, setValues] = useState(initialvalue)

    const handleChange = (e) =>{
        const{name, value} = e.target
        setValues({
            ...values,
            [name]:value,
        })
    }
    const handleClickSignup = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:4000/api/v1/user/signup",{
                email:values.email,
                username:values.username,
                password:values.password
            },
            {
                headers: { "Content-Type": "application/json" }, // Ensure JSON format
              }
            )
            console.log(values)
        }catch(e){
            console.log(e)
        }
        
    }
    return <form>
        <input value={values.email} onChange={handleChange} name="email" type="text" placeholder="email" />
        <input value={values.username} onChange={handleChange} name="username" type="text" placeholder="username"/>
        <input value={values.password} onChange={handleChange} name="password" type="text" placeholder="password"/>
        <button type="submit" onClick={handleClickSignup} style={{border:"1px solid", padding:"2px", marginLeft:"2px"}}>Signup</button>
    </form>
}