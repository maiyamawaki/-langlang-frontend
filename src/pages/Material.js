import React,{useContext, useState} from 'react'
import { Context } from "../context"
import axios from "axios"
import {createMaterial} from "../services"
import { Link } from "react-router-dom"

const Material = ({history}) => {
	const { user } = useContext(Context)

	const [title, setTitle] = useState("")
	const [photo, setPhoto] = useState("")
	const [description, setDescription] = useState("")

	async function createNewMaterial(){
		const newMaterial = {title,photo,description}
		createMaterial(newMaterial)
		history.push("/loading")
	}

	async function uploadPhoto({ target: { files } }) {
		const data = new FormData()
		data.append("file", files[0])
		data.append("upload_preset", "langlang")

		const {
				data: { secure_url }
		} = await axios.post("https://api.cloudinary.com/v1_1/dxpxe8gus/image/upload", data)
		setPhoto(secure_url)
		}

	return user ? (
		<div>
			<form onSubmit={createNewMaterial}>	
				<h1>Create study material</h1>
				<label>Title</label>
				<br></br>
				<input required type="text" name="title" value={title}onChange={e=>setTitle(e.target.value)} />
				<br></br>
				<br></br>
				<br></br>
				<label for="file_photo">
				<input style={{display:"none"}} type="file" id="file_photo" name="photo" onChange={uploadPhoto} />Photo
				</label>
				<br></br>
				<label>Description</label>
				<br></br>
				<br></br>
				<input required type="text" name="description" value={description}onChange={e=>setDescription(e.target.value)} />
				<br></br>
				<button className="submitBtn" type="submit">Create</button>
				<br></br>
				<a className="btn submitBtn" href="/profile">Profile</a>
			</form>
			<div className="infoCards">
				{user.materials.map((ele)=>{
					return(
						<div className="infos">
							<h3>{ele.title}</h3>
							<img src={ele.photo}></img>
							<p>{ele.description}</p>
							<br></br>
							<Link className="delete" to={`/material/${ele._id}`}>Delete</Link>
						</div>
					)
				})}
			</div>
		</div>
	):(
		null
	)
}

export default Material
