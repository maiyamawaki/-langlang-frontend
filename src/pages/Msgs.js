import React,{useContext} from 'react'
import { Context } from "../context"
import { Link } from "react-router-dom"

const Msgs = () => {
	const { user } = useContext(Context)
	
	return user? (
		<div>
			<h1>Check messages</h1>
				<div>
					{user.comments.map((ele, index)=>{
						return(
							<div className="infos">
								<h4>From : {ele.owner}</h4>
								<hr></hr>
								<h3>{ele.context}</h3>
								<Link to={`/search/${ele.ownerId}`}>
								<button className="delete">Respond</button>
								</Link>
								<Link to={`/msgs/${ele._id}`}>
									<button className="delete">Delete</button>
								</Link>
							</div>
						)
					})}
				</div>
		</div>
	):(
		<h2>Please login..</h2>
	)
}

export default Msgs
