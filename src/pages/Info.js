import React,{useState,useContext} from 'react'
import { Context } from "../context"
import axios from "axios"
import {createInfo} from "../services"
import { Link } from "react-router-dom" 

const Info = ({history}) => {
	const { user } = useContext(Context)

	const [title, setTitle] = useState("")
	const [photo, setPhoto] = useState("")
	const [description, setDescription] = useState("")

	async function createNewInfo(){
		const newInfo = {title,photo,description}
		createInfo(newInfo)
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


	return (
		<div>	
			<form onSubmit={createNewInfo}>	
			<h1>Create new Info</h1>
				<label>Title</label>
				<br></br>
				<input required type="text" name="title" value={title}onChange={e=>setTitle(e.target.value)} />
				<br></br>
				<br></br>
				<br></br>
				<label for="file_photo">
				<input style={{display:"none"}} id="file_photo" type="file" name="photo" onChange={uploadPhoto} />
				photo 
				</label>
				<br></br>
				<br></br>
				<label>Description</label>
				<br></br>
				<input required type="text" name="description" value={description}onChange={e=>setDescription(e.target.value)} />
				<br></br>
				<button className="submitBtn" type="submit">Create</button>
				<a className="btn" href="/profile">Profile</a>
			</form>
			<div className="infoCards">
				{user.infos.map((ele)=>{
					return(
						<div className="infos">
							<h2>{ele.title}</h2>
							<hr></hr>
							<img src={ele.photo}></img>
							<p>{ele.description}</p>
							<br></br>
							<Link className="delete" to={`/info/${ele._id}`}>Delete</Link>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Info
