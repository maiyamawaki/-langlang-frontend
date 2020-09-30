import React,{useEffect, useState} from 'react'
import { getOneUser, createComment} from "../services"
import { useHistory, Link } from "react-router-dom"
 
const UserDetail = ({match : {params : {userId}}}) => {
	const [oneUser, setOneUser] = useState(null)
	const [context, setcontext] = useState("")
	const history = useHistory()

	async function sendComment (e){
		e.preventDefault()
		const comment = {context}
		await createComment(userId, comment)
		history.push("/loading")
	}


	useEffect(()=>{
		async function fetchOneUser(){
			const {data : {user}} = await getOneUser(userId)
			setOneUser(user)
		}
		fetchOneUser()
	},[])

	return oneUser ? (
		<div className="container">
			<div className="aboutUser">
				<div className="aboutContainer">
					<div>
					<img src={oneUser.photo}></img>
					<h1>{oneUser.name}</h1>	
					</div>
					<div className="infomation">
						<h2>From : {oneUser.from}</h2>
						<h2>Native language:{oneUser.nativeLanguage}</h2>
						<h2>language to learn:{oneUser.learnLanguage}</h2>
						<h2>Hobby : {oneUser.hobby}</h2>
						<br></br>
						<hr></hr>
						<br></br>
						<p>{oneUser.about}</p>
					</div>
				</div>
				<br></br>
				<div className="comment">
					<form onSubmit={sendComment}>
					<br></br>
						<h3>Send message..</h3>
						<label></label>
						<br></br>
						<input required type="text" name="context" onChange={e => setcontext(e.target.value)} />
						<br></br>
						<button type="submit" className="submitBtn">Send</button>
						<Link className="btn submitBtn" to="/search">Back</Link>
					</form>
						<br></br>
				</div>
				<br></br>
			</div>
				<h3 style={{textAlign:"center"}}>About {oneUser.from}</h3>
			<div className="userInfos">
				{oneUser.infos.map((ele)=>{
					return(
							<div className="infos card info">
									<h3>{ele.title}</h3>
									<hr></hr>
									<img src={ele.photo}></img>
									<p>{ele.description}</p>
							</div>
					)
				})}
			</div>
			<br></br>	
			<br></br>
			<h3 style={{textAlign:"center"}}>Study Material for {oneUser.learnLanguage}</h3>
			<div className="userInfos">
				{oneUser.materials.map((ele, index)=>{
					return(
						<div className="infos card info">
						<h3>{ele.title}</h3>
									<hr></hr>
									<img src={ele.photo}></img>
									<p>{ele.description}</p>
						</div>
					)
				})}
			</div>
		</div>
	):(
		<h1>... Wait</h1>
	)
}

export default UserDetail
