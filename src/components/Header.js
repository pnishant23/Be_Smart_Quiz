import {Link} from "react-router-dom"

export default function Header (){
	return (
		<>
			<div className="flex justify-center mt-5 w-4/5 mx-auto rounded my-4">
				<h1 className="text-4xl md:text-6xl">
					<Link to='/'>Be Smart Quiz</Link>
				</h1>
			</div>
		</>
	)
}