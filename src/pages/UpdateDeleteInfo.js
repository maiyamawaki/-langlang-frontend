import React,{useEffect, useState} from 'react'
import {deleteInfo, getInfo} from "../services"
import {updateInfo} from "../services"


const UpdateDeleteInfo = ({history, match : {params : {infoId}}}) => {
	const [oneInfo, setOneInfo] = useState(null)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	async function deleteOneInfo(infoId){
		const info = await deleteInfo(infoId)
		console.log(info)
		history.push("/loading")
	}

	async function updateInformacion(){
		const updatedInfo = {title, description}
		await updateInfo(updatedInfo);
		console.log(updatedInfo)
		history.push("/loading")
	}

	useEffect(()=>{
		async function fetchOneInfo(){
			const {info} = await getInfo(infoId)
			setOneInfo(info)
		}
		fetchOneInfo();
	},[])

	return oneInfo?(
		<div>
			<div>
				<form className="editForm" onSubmit={updateInformacion}>
					<h1>Edit the information</h1>
					<label for="title">Title</label>
					<br></br>
					<input type="text" name="title" value={title} onChange={e=>setTitle(e.target.value)} />
					<br></br>
					<br></br>
					<label for="description">Description</label>
					<br></br>
					<input type="text" name="description" value={description} onChange={e=>setDescription(e.target.value)} />
					<br></br>
					<button type="submit" className="submitBtn">Edit</button>
				</form>
			</div>
			<div className="confirm">
			<h2>Are you sure to delete this information ? </h2>
			<br></br>
			<button className="delete" onClick={()=>{deleteOneInfo(`${oneInfo._id}`)}}>Delete</button>
			<a className="backBtn" href="/profile">Back</a>
		</div>
		</div>
	):(
		null
	)
}

export default UpdateDeleteInfo
