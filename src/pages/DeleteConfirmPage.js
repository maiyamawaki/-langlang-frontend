import React, {useEffect, useState} from 'react'
import {deleteComment, getMsg} from "../services"

const DeleteConfirmPage = ({history, match : {params : {msgId}}}) => {
	const [oneMsg, setOneMsg] = useState(null)

	async function deleteOne(msgId){
		const msg = await deleteComment(msgId)
		console.log(msg)
		history.push("/loading")
	}

	useEffect(()=>{
		async function fetchOneMsg(){
			const {msg} = await getMsg(msgId)
			setOneMsg(msg)
		}
		fetchOneMsg()
		console.log(oneMsg)
	},[])

	return oneMsg ? (
		<div className="confirm">
			<h2>Are you sure to delete this message?</h2>
			<br></br>
			<button className="delete" onClick={()=>{deleteOne(`${oneMsg._id}`)}}>Delete</button>
		</div>
	):(
		null
	)
}

export default DeleteConfirmPage
