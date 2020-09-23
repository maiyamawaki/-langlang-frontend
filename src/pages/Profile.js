import React, {useContext} from 'react'
import axios from "axios"
import { Context } from "../context"
import { Link } from 'react-router-dom';
import {getCurrentUser, logoutP, updateProfilePhoto} from "../services/index"

const Profile = () => {
	const { user, loginUser, logout } = useContext(Context)

		async function uploadPhoto(e) {
			const data = new FormData()
			console.log(e.target.files[0])
			data.append("file", e.target.files[0])
			data.append("upload_present", "langlang")
			const {
					data: { secure_url }
			} = await axios.post("https://api.cloudinary.com/v1_1/dxpxe8gus/image/upload", data)
			await updateProfilePhoto(secure_url)
			const { user } = await getCurrentUser()
			loginUser(user)
	}

	async function setLogout() {
		await logoutP()
		logout()	
	}

	return (
		<div className="container">
			<h1>Welcome {user?.name}</h1>
			<img src={user?.photo} />
			<br></br>
      <input type='file' name='photo' id='photo' onChange={uploadPhoto} />
			<p>Your native language:{user?.nativeLanguage}</p>
			<p>the language you want to learn:{user?.learnLanguage}</p>
			<Link to="/search">Search someone</Link>
		</div>
	)
}

export default Profile

