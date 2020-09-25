import React, {useEffect,useContext} from 'react'
import { Context } from "../context"
import {getCurrentUser, logoutP} from "../services/index"

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
					<p onClick={setLogout}><a href="/">Logout</a></p>
					<p><a href="/profile">Profile</a></p>
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
