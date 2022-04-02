import {useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"

export default function Result ({
    score, 
    totalQ, 
    setScore,
    setQuestions
}){
  const navigate =useNavigate()
 /* useEffect(()=>{
    if(!score){
      navigate('/')
    }
  })*/
  
  function playAgain(){
    navigate('/')
    setScore(0)
    setQuestions()
  }
	return (
		<>
			<div className="flex flex-col justify-center items-center gap-5 mt-7 rounded mx-auto p-5 m-2 w-4/5 shadow-home">
				<h3 className="text-2xl">
					Result
				</h3>
				<p className="text-md ">
					You got <span className="font-semibold">{score}</span> out of <span className="font-semibold
					">{totalQ}</span> questions correct
				</p>
				<div>
						<button className="rounded px-3 py-2 bg-indigo-500 text-white"
						onClick={playAgain}
						>
							Play Again !
						</button>
				</div>
			</div>
		</>
	)
}