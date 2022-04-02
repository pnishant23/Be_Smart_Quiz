import {useState} from 'react'
import {useNavigate} from "react-router-dom"

export default function Home ({apicat,fetchQuestions}){
	
	//states to store data
	const [difficulty, setDifficulty] = useState("")
	const [category, setCategory] = useState("")
	const [noq, setNoq] = useState(0)
	const [error, setError] = useState(false)
	const navigate = useNavigate()
	
	//funtion to start after submitting form
	function handleSubmit (){
		if( !difficulty || !category || !noq ){
			setError(true)
			return
		}else{
			setError(false)
			navigate('/quiz')
			fetchQuestions(category,difficulty,noq)
		}
	}
	
	return (
		<>{/*wrapper for form*/}
		{ apicat ? (
			<div className="flex justify-center items-center flex-col gap-5 h-3/5 p-5 m-5 rounded shadow-home">
			  <div className="text-center">Let's customize your quiz before starting !</div>
				{/*showing error for not filling complete form*/}
				{error ? (
	<p className="bg-red-400 px-4 py-2 rounded">Please fill all the inputs</p>) : ('')}
	{/*wrapper for input feilds*/}
				<div className="flex flex-col justify-start gap-5 w-4/5">
				{/*wrapper for category feild*/}
				<div className="flex flex-col justify-start w-full">
					<label forhtml="category" className="text-xl">Category:</label>
						<select 
						id="category"
						value={category}
onChange={(e)=>{setCategory(e.target.value)}}
					    className="rounded px-2 py-2 bg-black text-white">
							<option>Select Your Category</option>
							{apicat.map((x)=>{
	return <option key={x.id} value={x.id}>{x.name}</option>
})}
						</select>
				</div>
				<div className="flex flex-col justify-start">
					<label forhtml="difficulty" className="text-xl">Difficulty:</label>
						<select 
						id="difficulty"
						value={difficulty}
						onChange={(e)=>{setDifficulty(e.target.value)}} 		
						className="rounded px-4 py-2 bg-black text-white">
							<option>Select Difficulty</option>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
				</div>
				<div>
					<label forhtml="no.-of-ques">Number of Questions ?</label>
					<input
					className="outline-none w-1/2 ring-2 bg-black text-white rounded" 
					type="number"
					id="no.-of-question"
					value={noq}
					onChange={(e)=>{setNoq(e.target.value)}}
					/>
				</div>
				</div>
					<button 
						onClick={handleSubmit}
						className="px-5 py-2 rounded bg-blue-400 text-white">
					Start Quiz
					</button>
			</div>
			):(
			<div className="loading">
        <div class="lds-ripple"><div></div><div></div></div>			
			</div>)}
		</>
	)
}
