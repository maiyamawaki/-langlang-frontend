import React,{useEffect, useContext} from 'react'
import { Context } from "../context"
import {getCurrentUser, logoutP} from "../services/index"

const CheckComments = () => {
	const { user, loginUser, logout } = useContext(Context)
	console.log(user)

	async function fetchUser(){
		const { user } = await getCurrentUser()
		loginUser(user)
	}

	useEffect(()=>{
		fetchUser();
		console.log(user)
	},[])
	
	return (
		<div>
			<a href="/profile">profile</a>
		</div>
	)
}

export default CheckComments
