import React, {useContext} from 'react'
import axios from "axios"
import { Context } from "../context"
import { Link } from 'react-router-dom';
import {getCurrentUser, logoutP, updateProfilePhoto} from "../services"

const Profile = ({history}) => {
	const { user, loginUser, logout } = useContext(Context)

		async function uploadPhoto({target : {files}}) {
			const data = new FormData()
			data.append("file", files[0])
			data.append("upload_present", "langlang")

			const {
					data: { secure_url }
			} = await axios.post("https://api.cloudinary.com/v1_1/dxpxe8gus/image/upload", data)
			updateProfilePhoto(secure_url)
			const { user } = await getCurrentUser()
			loginUser(user)
	}

	async function setLogout() {
		await logoutP()
		logout()	
		history.push("/")
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
			{user ? (
				<div class="viewComments">
					{user.comments.map((ele,index)=>{
						return(
							<div key={index} className="comment">
							<Link to={`/search/${ele.ownerId}`}>
								<p>From : {ele.owner}     {ele.createdAt}</p>
								<hr></hr>
								<h4>{ele.context}</h4>
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


