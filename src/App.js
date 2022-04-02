import {useState, useEffect} from "react"
import Header from "./components/Header"
import Home from "./pages/Home"
import Quiz from "./pages/Quiz"
import Result from "./pages/Result"
import Footer from "./components/Footer"
import {BrowserRouter, Route, Routes } from "react-router-dom"
import axios from 'axios'

function App() {
	const [category, setCategory] = useState()
	const [cat, setCat] = useState()
	const [questions, setQuestions] = useState()
	const [score, setScore] = useState(0)
	const [totalQ, setTotalQ] = useState()
	
	//fetching categrories
	useEffect(()=>{
		axios.get("https://opentdb.com/api_category.php")
		.then((res)=>{
			      setCategory(res.data.trivia_categories);
		})
	},[])
	
	//callback funciton to to fetch questions
	const fetchQuestions = async (catfh, difficulty,noq) => {
			const {data} = await axios.get(`https://opentdb.com/api.php?&amount=${noq}&category=${catfh}&difficulty=${difficulty}`)
			
			//console.log(data.results)
			setQuestions(data.results)
			setTotalQ(noq)
		//	console.log(noq)
		}
		
		//console.log(totalQ)
		
  return (
    <>
		<BrowserRouter>
			<Header/>
			<Routes>
				<Route 
				exact 
				path="/" 
				element={
					<Home 	
						apicat={category}
							fetchQuestions={fetchQuestions} 
					/>
				}
				/>
				<Route
				exact 
				path="/quiz" 
				element={
					<Quiz
						questions={questions}
						setQuestions={setQuestions}
						score={score}
						setScore={setScore}
						totalQ={totalQ}
					/>
				}
				/>
				<Route
				exact
				path="/result"
				element={
					<Result
						score={score}
						setScore={setScore}
						totalQ={totalQ}
						setQuestions={setQuestions}
					/>
				}
				/>
			</Routes>
      <Footer/>
		</BrowserRouter>
	</>
  );
}

export default App;
