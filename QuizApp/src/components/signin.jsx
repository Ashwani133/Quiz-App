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

    const handleClickSignin = async()=>{

    }

    return <form>
        <input value={values.email} onChange={handleChange} name="email" type="text" placeholder="email" />
        <input value={values.password} onChange={handleChange} name="password" type="text" placeholder="password"/>
        <button type="submit" onClick={handleClickSignin} style={{border:"1px solid", padding:"2px", marginLeft:"2px"}}>Signin</button>
    </form>
}