import axios from "axios"
import { useEffect, useState } from "react"

export const Quizzes = ()=>{
    const[data, setData] = useState([]);
    const[selectedOptions, setSelectedOptions] = useState({})
    useEffect( ()=>{
        const token = localStorage.getItem("token")
            const fetchData = async ()=>{
                try{
                    const response = await axios.get("http://localhost:4000/api/v1/user/quizzes",{
                        headers:{
                            token:token
                        }
                    })
                    setData(response.data)
                    console.log(response.data)
                }catch(e){
                    console.log("Error sending the request",e);
                }
            }
            fetchData();
    },[])

    function handleOptionChange(questionId,option){
        setSelectedOptions((prev) => ({...prev,[questionId]:option}))
    }   
    function submitResult(){

    }
    return (
        <div>
          {data.map((item,index)=>(<div key={index}><h1>{item.title}</h1>
          <div><h4>{item.description}</h4></div>
          <ol>{item.questions.map((ques,idx) => <li key={idx}><div>{ques.questionText}</div><div>
            {ques.options.map((option,id) => <div key={id}><input id={`option-${idx}-${id}`} type="radio" name={`question-${idx}`} value={option} onChange={handleOptionChange(`${ques._id}`,option)}/><label htmlFor={`option-${idx}-${id}`}>{option}</label></div>
            )}
            </div></li>)}
          </ol>
          </div>))}
          <button onClick={submitResult}>Submit</button>
        </div>
      );

}