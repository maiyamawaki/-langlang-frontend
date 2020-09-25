import React, {useContext} from 'react'
import axios from "axios"
import { Context } from "../context"
import { Link } from 'react-router-dom';
import {getCurrentUser, updatePhoto} from "../services"

const Profile = () => {
	const { user, loginUser } = useContext(Context)

		async function uploadPhoto(e) {
			const data = new FormData()
			data.append("file", e.target.files[0])
			data.append("upload_preset", "langlang")

			const {
					data: { secure_url }
			} = await axios.post("https://api.cloudinary.com/v1_1/dxpxe8gus/image/upload", data)
			await updatePhoto(secure_url)
			const { user } = await getCurrentUser()
			loginUser(user)
			}

	return user ? (
		<div className="container">
			<h1>Welcome {user?.name}</h1>
			<img src={user?.photo} />
			<br></br>
      <input type='file' name='photo' id='photo' onChange={uploadPhoto} />
			<p>Your native language:{user?.nativeLanguage}</p>
			<p>the language you want to learn:{user?.learnLanguage}</p>
			<button>
				<a href="/search">Search someone</a>
			</button>
			<button>
				<Link to="/profile/info">Info</Link>
			</button>
			{user ? (
				<div className="viewComments">
					{user.comments.map((ele,index)=>{
						return(
							<div key={index} className="comment">
								<p>From : {ele.owner}     {ele.createdAt}</p>
								<hr></hr>
								<h4>{ele.context}</h4>
							{/* <button>Delete comment</button> */}
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


