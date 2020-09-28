import React, {useContext, useState} from 'react'
import { Context } from "../context"
import {getCurrentUser, updatePhoto, updateProfile} from "../services"
import axios from "axios"


const EditProfile = ({history}) => {
	const { user, loginUser } = useContext(Context)
	const [learnLanguage, setlearnLanguage] = useState("")
	const [hobby, sethobby] = useState("")
	const [about, setabout] = useState("")
	
	async function realizeUpdateProfile(){
		const newPro = {learnLanguage, hobby, about}
		await updateProfile(newPro)
		history.push("/profile")
	}

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

	return (
		<div className="updateProfile">
				<h1>Edit profile</h1>
			<form className="editForm" onSubmit={realizeUpdateProfile}>
				<input className="file" type='file' name='photo' id='photo' onChange={uploadPhoto} />
				<br></br>
				<label>langueage</label>
				<br></br>
				<input required type="text" name="learnLanguage" value={learnLanguage}onChange={e=>setlearnLanguage(e.target.value)} />
				<br></br>
				<label>Hobby</label>
				<br></br>
				<textarea required type="text" name="hobby" value={hobby}onChange={e=>sethobby(e.target.value)} />
				<br></br>
				<br></br>
				<label>About</label>
				<br></br>
				<textarea required type="text" name="about" value={about}onChange={e=>setabout(e.target.value)} />
				<br></br>
				<button className="whiteBtn" type="submit">Edit</button>
			</form>
		</div>
	)
}

export default EditProfile
