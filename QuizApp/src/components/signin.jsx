import axios from "axios"
import { useState } from "react"

export const Signin = ()=>{
    const initialvalue = {
        email:"",
        password:""
    } 
    
    const [values, setvalues] = useState(initialvalue)

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setvalues({...values,
        [name]:value,
    })
    }

    const handleClickSignin = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:4000/api/v1/user/signin",{
                email:values.email,
                password:values.password
            })
            console.log("you are signed in!",response)
            localStorage.setItem("token",response.data.token)
        }catch(e){
            console.log(e)
        }
    }

    return <form>
        <input value={values.email} onChange={handleChange} name="email" type="text" placeholder="email" />
        <input value={values.password} onChange={handleChange} name="password" type="text" placeholder="password"/>
        <button type="submit" onClick={handleClickSignin} style={{border:"1px solid", padding:"2px", marginLeft:"2px"}}>Signin</button>
    </form>
}