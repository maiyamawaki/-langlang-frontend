import React, {useState, useEffect} from 'react'
import {editInfo, delteInfo, getOneInfo} from "../services"
import axios from "axios"

const InfoDetail = ({history, match : {params : {infoId}}}) => {
	const [titleInfo, setTitleInfo] = useState(null);
	const [descInfo, setDescInfo] = useState(null);
	const [title, setTitle] = useState("")
	const [photo, setPhoto] = useState("")
	const [description, setDescription] = useState("")

	async function getCurrentInfo(){
		const {data:{info}} = await getOneInfo(infoId)
		setTitleInfo(info.title)
		setDescInfo(info.description)
	}

	async function updateInfo(){
		const updatedInfo = {title, photo, description}
		editInfo(updatedInfo)
		console.log(updatedInfo);
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

		useEffect(()=>{
			getCurrentInfo()
		},[])
		
	return (
		<div>
			<form onSubmit ={updateInfo}>
				<label>Title</label>
				<input required type="text" name="title" placeholder={titleInfo} value={title}onChange={e=>setTitle(e.target.value)} />
				<br></br>
				<label>photo </label>
				<br></br>
				<input type="file" name="photo" onChange={uploadPhoto} />
				<br></br>
				<label>Description</label>
				<br></br>
				<textarea placeholder={descInfo} required type="text" name="description" value={description}onChange={e=>setDescription(e.target.value)} />
				<br></br>
				<button type="submit">Update</button>
			</form>
		</div>	
	)
}

export default InfoDetail
