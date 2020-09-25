import React, {useContext} from 'react'
import { Context } from "../context"
import { Link } from 'react-router-dom';
import { deleteComment } from "../services"


const Profile = ({history}) => {
	const { user } = useContext(Context)

	async function deleteOne(id){
			alert("The messsage has been deleted.")
			const messageId = id
			await deleteComment(messageId)
			history.push("/search")
	}
	
	return user ? (
		<div className="container">
			<h1>Welcome {user?.name}</h1>
			<img src={user?.photo} />
			<br></br>
			<br></br>
			<div className="profileDetail">
				<Link className="btn login" to="/profile/editprofile">Edit your profile</Link>
				<br></br>
				<div className="userInfo">
					<p>From : {user?.from}</p>
					<p>Living : {user?.living}</p>
					<p>Native language : {user?.nativeLanguage}</p>
					<p>Learning : {user?.learnLanguage}</p>
					<p>Hobby : {user?.hobby}</p>
					<br></br>
					<p>{user?.about}</p>
				</div>

				<Link className="btn login" to="/search">Search someone</Link>
				<br></br>
				<Link className="btn login" to="/profile/info">Info</Link>
			</div>
			<br></br>
			{user ? (
				<div className="viewComments">
					{user.comments.map((ele,index, arr)=>{
						return(
							<div key={index} className="comment">
								<p>From : {ele.owner}</p>
								<p>{ele.createdAt}</p>
								<hr></hr>
								<h4>{ele.context}</h4>
								<Link to={`/search/${ele.ownerId}`}>
								<button>Respond</button>
								</Link>
								<br></br>
								<br></br>
									<button onClick={()=>{deleteOne(ele._id)}}>Delete</button>
							</div>
						)
					})}
				</div>
				):(
					null
				)}
		</div>
	):(
		<div>
			<h3>Please login...</h3>
		</div>
	)
}

export default Profile


