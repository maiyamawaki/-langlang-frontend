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
		history.pushState("/profile")
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
				<textarea required type="text" name="description" value={description}onChange={e=>setDescription(e.target.value)} />
				<br></br>
				<button type="submit">Create</button>
			</form>
			<div>
					{user.infos.map((ele)=>{
						return(
							<div key={ele._id}>
								<h3>{ele.title}</h3>
								<img src={ele.photo}></img>
								<p>{ele.description}</p>
								<Link to={`/profile/info/${ele._id}`}>Edit information</Link>
							</div>
						)
				})}
			</div>
		</div>
	)
}

export default Info
