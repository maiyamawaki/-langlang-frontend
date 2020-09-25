import React, {useContext} from 'react'
import { Context } from "../context"
import { Link } from 'react-router-dom';


const Profile = () => {
	const { user } = useContext(Context)

	return user ? (
		<div className="container">
			<h1>Welcome {user?.name}</h1>
			<img src={user?.photo} />
			<br></br>
			{/* <button>
				<Link to="/profile/editprofile">Edit your profile</Link>
			</button> */}
			<p>Your native language:{user?.nativeLanguage}</p>
			<p>the language you want to learn:{user?.learnLanguage}</p>

			<Link className="btn login" to="/search">Search someone</Link>
			<br></br>
			<Link className="btn login" to="/profile/info">Info</Link>

			{user ? (
				<div className="viewComments">
					{user.comments.map((ele,index)=>{
						return(
							<div key={index} className="comment">
								<p>From : {ele.owner}     {ele.createdAt}</p>
								<hr></hr>
								<h4>{ele.context}</h4>
							<br></br>
							<br></br>
							<Link to={`/search/${ele.ownerId}`}>
							<button>Respond</button>
							</Link>
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


