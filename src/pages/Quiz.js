import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import Question from "../components/Question"

export default function Quiz ({
    questions, 
    setQuestions, 
    score, 
    setScore,
    totalQ
}){
	const [questionNumber, setQuestionNumber] = useState(0)
	const [options, setOptions] = useState()
	
	useEffect(()=>{
	  setOptions(makeOptions())
	}, [questions, questionNumber])
	
	function makeOptions (){
	    const x = questions && handleShuffle(
	        [questions[questionNumber].correct_answer,...questions[questionNumber].incorrect_answers]
	      )
	    function handleShuffle(o){
	      return o.sort(()=>Math.random()- 0.5)
	    }
	    return x
	}
	//console.log(options)
	return (
	  <>
		  {
		    questions ? (
		      <>
		      <div className="py-4 w-4/5 my-4 mx-auto rounded shadow-home">
		      <Question
		        questions={questions}
		        setQuestions={setQuestions}
		        options={options}
		        correct={questions[questionNumber]?.correct_answer}
		        score={score}
		        setScore={setScore}
		        questionNumber={questionNumber}
		        setQuestionNumber={setQuestionNumber}
		        totalQ={totalQ}
		      />
		      </div>
		      </>
		      
		      ):
		    (
		        <div className="loading">
		          <div class="lds-ripple"><div></div><div></div></div>
		          <Link to="/">
		          <button className="rounded px-3 py-2 bg-indigo-500 text-white">
		          <div><i>taking to long</i></div>
		            back to Home
		          </button>
		          </Link>
		        </div>  
		    ) 
		  }
		</>
	)
}