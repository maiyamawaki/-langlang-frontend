import React, {useContext, useState} from 'react'
import axios from "axios"
import { Context } from "../context"
import {getCurrentUser, updatePhoto, editProfile} from "../services"


const EditProfile = () => {
	const { user, loginUser } = useContext(Context)
	const [laernLang, setLearnLang] = useState("")
	const [photo, setPhoto] = useState("")
	const [hobby, sethobby] = useState("")
	const [updateduser, setUpdatedUser] = useState(user)
	
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
		<div>
				<label>Your photo</label>
				<br></br>
				<input type='file' name='photo' id='photo' onChange={uploadPhoto} />
				<br></br>
				<label>langueage</label>
				<input required type="text" name="laernLang" value={laernLang}onChange={e=>setLearnLang(e.target.value)} />
				<button type="submit">Edit</button>

		</div>
	)
}

export default EditProfile
