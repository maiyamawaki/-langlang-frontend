import React,{useState,useContext} from 'react'
import { Context } from "../context"
import axios from "axios"
import {createInfo} from "../services"
import { Link } from 'react-router-dom';


const Info = ({history}) => {
	const { user } = useContext(Context)


	const [title, setTitle] = useState("")
	const [photo, setPhoto] = useState("")
	const [description, setDescription] = useState("")

	async function createNewInfo(){
		const newInfo = {title,photo,description}
		createInfo(newInfo)
		history.push("/profile")
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


	return (
		<div className="info">
			<form onSubmit={createNewInfo}>	
			<h1>Create new Info</h1>
				<label>Title</label>
				<br></br>
				<input required type="text" name="title" value={title}onChange={e=>setTitle(e.target.value)} />
				<br></br>
				<label>photo </label>
				<br></br>
				<input required type="file" name="photo" onChange={uploadPhoto} />
				<br></br>
				<label>Description</label>
				<br></br>
				<br></br>
				<textarea required type="text" name="description" value={description}onChange={e=>setDescription(e.target.value)} />
				<br></br>
				<button className="btn login" type="submit">Create</button>
			</form>
			<div className="infoCards">
				{user.infos.map((ele)=>{
					return(
						<div className="infos">
							<h3>{ele.title}</h3>
							<img src={ele.photo}></img>
							<p>{ele.description}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Info
