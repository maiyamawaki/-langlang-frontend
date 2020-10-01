import React, {useContext, useState} from 'react'
import { Context } from "../context"
import {getCurrentUser, updatePhoto, updateProfile} from "../services"
import axios from "axios"


const EditProfile = ({history}) => {
	const { user, loginUser, setUser } = useContext(Context)
	const [learnLanguage, setlearnLanguage] = useState("")
	const [hobby, sethobby] = useState("")
	const [about, setabout] = useState("")
	
	async function realizeUpdateProfile(e){
		e.preventDefault()
		const newPro = {learnLanguage, hobby, about}
		await updateProfile(newPro)
		console.log(newPro)
		history.push("/loading")
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
			<form className="editForm" onSubmit={realizeUpdateProfile}>
				<h1>Edit profile</h1>
				<label for="file_photo">
				<input style={{display:"none"}} id="file_photo" required type="file" name="photo" onChange={uploadPhoto} />
				photo 
				</label>
				<br></br>
				<label>Learing ..</label>
				<br></br>
				<input required type="text" name="learnLanguage" value={learnLanguage}onChange={e=>setlearnLanguage(e.target.value)} />
				<br></br>
				<br></br>
				<label>Your hobby</label>
				<br></br>
				<input required type="text" name="hobby" value={hobby}onChange={e=>sethobby(e.target.value)} />
				<br></br>
				<br></br>
				<label>About you</label>
				<br></br>
				<input required type="text" name="about" value={about}onChange={e=>setabout(e.target.value)} />
				<br></br>
				<button onClick="/loading" className="submitBtn" type="submit">Edit</button>
			</form>
		</div>
	)
}

export default EditProfile
