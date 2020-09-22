import React,{useContext, useEffect, useState} from 'react'
import { getOneUser } from "../services/index"
import { Link } from "react-router-dom"

const UserDetail = ({match : {params : {userId}}}) => {
	const {oneUser, setOneUser} = useState(null)
	console.log(userId)
	
	useEffect(()=>{
		async function fetchOneUser(){
			const user = await getOneUser(userId)
			setOneUser(user)
		}
		fetchOneUser()
		console.log(oneUser)
	},[])


	return oneUser ? (
		<div>
			<img src={oneUser.photo}></img>
			<h1>{oneUser.name}</h1>
			<p>Native language:{oneUser.nativeLanguage}</p>
			<p>the language they want to learn:{oneUser.learnLanguage}</p>
			<Link to="/search">Back</Link>
		</div>
	):(
		<h1>... espera</h1>
	)
}

export default UserDetail
