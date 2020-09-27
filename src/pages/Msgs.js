import React,{useContext} from 'react'
import { Context } from "../context"
import { Link } from "react-router-dom"
import { deleteComment } from "../services"

const Msgs = () => {
	const { user } = useContext(Context)
	
	async function deleteOne(messageId){
		// console.log(id)
		// let messageId = id
		// console.log(messageId)
		// await deleteComment(messageId)
		// history.push("/search")
		const deleteMsg = await deleteComment(messageId);
		console.log(deleteMsg);

}


	return user? (
		<div>
			<h1>Check messages</h1>
				<div>
					{user.comments.map((ele, index)=>{
						return(
							<div className="comment">
								<h4>From : {ele.owner}</h4>
								<h3>{ele.context}</h3>
								<Link to={`/search/${ele.ownerId}`}>
								<button>Respond</button>
								</Link>
								<Link to={`/msgs/${ele._id}`}>
									<button>Delete</button>
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
