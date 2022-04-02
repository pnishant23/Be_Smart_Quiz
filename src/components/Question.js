import {useState} from "react"
import {useNavigate} from "react-router-dom"

export default function Question({
    questions,
    setQuestions,
    options,
    setOptions,
    score,
    setScore,
    questionNumber,
    setQuestionNumber,
    correct,
    totalQ
}){
  const [select, setSelect] = useState()
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  
  //to check whether the answer is correct or not and change background color of button
  function handleSelect(i){
    if(select === i && select === correct){
      return "select"
    }
    else if(select === i && select !== correct){
      return "wrong"
    }
    else if(i === correct){
      return "select"
    }
  }
  
  function handleCheck(x){
    setSelect(x)
     if (x === correct) setScore(score + 1)
     setError(false)
  }
  
  //change question
  function handleNext(){
     if(questionNumber > totalQ-2){
       navigate('/result')
     }
     else if(select){
       setQuestionNumber(questionNumber + 1)
       setSelect()
     }else{
       setError(true)
     }
  }
  
  function handleQuit(){
    navigate('/result')
  }
  //decode string
  function decodestr(str){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }
  
  return (
	  <>
		{/*wrapper*/}
			<div className="flex flex-col gap-5 justify-center items-center mt-7">
			{/*category wrapperr*/}
				<div className="text-xl underline text-center">
					<h3>
						{questions ? (
						questions[questionNumber]?.category) : (
						<div>''</div>
						)
						  
						}
					</h3>
				</div>
				{error && <p className="w-3/4 bg-red-300 p-2 mx-2 font-white"> "Please select a option"</p>}
				{/*question wrapper*/}
				<div className="font-medium text-md mt-5 mx-4 text-center">
					<p>Q{questionNumber + 1} : {decodestr(questions[questionNumber].question)}</p>
				</div>
				{/*options wrappre*/}
				<div className="flex flex-col justify-start w-48">
				{options ? (
				  <>
				  { options.map((x)=>{
				    return(
					    <button 
					    className={`singleOption  ${select && handleSelect(x)}`}
					    disable={select}
					    onClick={()=>handleCheck(x)}
					    >{decodestr(x)}
					    </button>
					  )
				  })
				  }
				  </>
					):(
					<div className="loading">
					  <div class="lds-ripple"><div></div><div></div></div>  
					</div>)
				}
				</div>
				<div className="flex justify-center items-cente gap-3">
					<button className="rounded px-4 py-2 bg-red-600 text-white"
					onClick={handleQuit}
					>
						Quit
					</button>
					<button className="rounded px-4 py-2 bg-blue-400 text-white"
					onClick={handleNext}
					>
						Next
					</button>
				</div>
			</div>
		</>
	)
}