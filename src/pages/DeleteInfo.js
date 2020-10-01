import React,{useEffect, useState} from 'react'
import {deleteInfo, getInfo} from "../services"
import { useHistory } from "react-router-dom"



const DeleteInfo = ({match : {params : {infoId}}}) => {
	const [oneInfo, setOneInfo] = useState(null)
	const history = useHistory()

	async function deleteOneInfo(){
		const info  = await deleteInfo(infoId)
		console.log(info)
		console.log(info)
		history.push("/loading")
	}

	useEffect(()=>{
		async function fetchOneInfo(){
			const {info} = await getInfo(infoId)
			setOneInfo(info)
		}
		fetchOneInfo();
	},[infoId])

	return oneInfo?(
		<div>
			<div className="confirm">
			<h2>Are you sure to delete this information ? </h2>
			<br></br>
			<button className="delete" onClick={deleteOneInfo}>Delete</button>
			<a className="backBtn" href="/profile">Back</a>
		</div>
		</div>
	):(
		null
	)
}

export default DeleteInfo
