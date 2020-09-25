import React,{useEffect, useState} from 'react'
import { getOneUser, createComment} from "../services"


const UserDetail = ({history, match : {params : {userId}}}) => {
	const [oneUser, setOneUser] = useState(null)
	const [context, setcontext] = useState("")
	
	async function sendComment (){
		alert("The message has been sent")
		const newComment = {context}
		const {data :{user}} = await getOneUser(userId)
		await createComment(user._id, newComment)
		setcontext("")
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
				<div>
					<img src={oneUser.photo}></img>
					<h1>{oneUser.name}</h1>
					<p>From : {oneUser.from}</p>
					<p>Native language:{oneUser.nativeLanguage}</p>
					<p>language to learn:{oneUser.learnLanguage}</p>
					<p>Hobby : {oneUser.hobby}</p>
				</div>
				<div class="comment">
					<form onSubmit={sendComment}>
						<h2>Send message..</h2>
						<label>Title</label>
						<br></br>
						<input required type="text" name="context" value={context}onChange={e=>setcontext(e.target.value)} />
						<br></br>
						<button type="submit">Send</button>
					</form>
				</div>
			</div>
			<div className="userInfos">
				{oneUser.infos.map((ele)=>{
					return(
							<div className="infos card">
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
		<h1>... espera</h1>
	)
}

export default UserDetail
