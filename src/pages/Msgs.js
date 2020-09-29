import React,{useContext, useState, useEffect} from 'react'
import { Context } from "../context"
import { Link } from "react-router-dom"
import { getOneUser } from "../services"

const Msgs = () => {
	const { user } = useContext(Context)
	const [photo, setPhoto] = useState("")

	// async function getPhoto(id){
	// 	const use = await getOneUser(id);
	// 	setPhoto(use.photo)
	// }



	return user? (
		<div>
				<div className="msgs">
					<h1>You have <p style={{color:"tomato"}}>{user.comments.length}</p> messages</h1>
					{user.comments.map((ele, index)=>{
						return(
							<div key={ele._id} className="infos">
								<h4>From : {ele.owner}</h4>
								<p>{ele.createdAt}</p>
								<hr></hr>
								<p>{ele.ownerId.photo}</p>
								<h3>{ele.context}</h3>
								<br></br>
								<Link to={`/search/${ele.ownerId}`}>
								<button className="response">Respond</button>
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
