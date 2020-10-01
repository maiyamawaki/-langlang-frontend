import React, {useEffect, useState} from 'react'
import {deleteComment, getMsg} from "../services"
import { useHistory } from "react-router-dom"

const DeleteConfirmPage = ({ match : {params : {msgId}}}) => {
	const [oneMsg, setOneMsg] = useState(null)
	const history = useHistory()

	async function deleteOne(e){
		e.preventDefault()
		const msgDelete = await deleteComment(msgId)
		console.log(msgDelete)
		history.push("/loading")
	}

	useEffect(()=>{
		async function fetchOneMsg(){
			const {msg} = await getMsg(msgId)
			setOneMsg(msg)
		}
		fetchOneMsg()
		console.log(oneMsg)
	},[msgId, oneMsg])

	return oneMsg ? (
		<div className="confirm">
			<h2>Are you sure to delete this message?</h2>
			<br></br>
			<button className="delete" onClick={deleteOne}>Delete</button>
			<a className="backBtn" href="/profile">Back</a>
		</div>
	):(
		null
	)
}

export default DeleteConfirmPage
