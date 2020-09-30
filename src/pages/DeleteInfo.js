import React,{useEffect, useState} from 'react'
import {deleteInfo, getInfo} from "../services"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"


const DeleteInfo = ({match : {params : {infoId}}}) => {
	const [oneInfo, setOneInfo] = useState(null)
	const history = useHistory()

	async function deleteOneInfo(e){
		e.preventDefault()
		const info = await deleteInfo(infoId)
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
			<Link className="backBtn" to="/profile">Back</Link>
		</div>
		</div>
	):(
		null
	)
}

export default DeleteInfo
