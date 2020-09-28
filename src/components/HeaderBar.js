import React, {useEffect,useContext} from 'react'
import { Context } from "../context"
import {getCurrentUser, logoutP} from "../services/index"
import {Link} from "react-router-dom"

const HeaderBar = ({history}) => {
	const { user, loginUser, logout } = useContext(Context)

	async function checkAuth(){
		const { user } = await getCurrentUser()
		loginUser(user)
	}

	useEffect(()=>{
		checkAuth()
	},[])
	
	async function setLogout() {
		await logoutP()
		logout()	
	}

	return user ? (
				<header>
					<a href="/search"><h1>langlang</h1></a>	
					<div className="links">
					<button onClick={setLogout}><a href="/">Logout</a></button>
					<button><a href="/profile">Profile</a></button>
					</div>
				</header>
			):
			(
				<header>
						<a href="/"><h1>langlang</h1></a>	
						<div className="links">
						<p><a href="/signup">Signup</a></p>
						<p><a href="/login">Login</a></p>
						</div>
				</header>
			)
}

export default HeaderBar
