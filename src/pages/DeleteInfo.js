import React,{useEffect, useState} from 'react'
import {deleteInfo, getInfo} from "../services"

const DeleteInfo = ({history, match : {params : {infoId}}}) => {
	const [oneInfo, setOneInfo] = useState(null)

	async function deleteOneInfo(infoId){
		const info = await deleteInfo(infoId)
		console.log(info)
		history.push("/search")
	}

	useEffect(()=>{
		async function fetchOneInfo(){
			const {info} = await getInfo(infoId)
			setOneInfo(info)
		}
		fetchOneInfo();
	},[])

	return oneInfo?(
		<div className="confirm">
			<h2>Are you sure to delete this information ? </h2>
			<br></br>
			<button className="delete" onClick={()=>{deleteOneInfo(`${oneInfo._id}`)}}>Delete</button>
			<a className="backBtn" href="/profile">Back</a>
		</div>
	):(
		null
	)
}

export default DeleteInfo
