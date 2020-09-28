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
				<hr></hr>
				<div class="comment">
					<form onSubmit={sendComment}>
					<br></br>
						<h3>Send message..</h3>
						<label></label>
						<br></br>
						<input required type="text" name="context" value={context}onChange={e=>setcontext(e.target.value)} />
						<br></br>
						<button type="submit" className="submitBtn">Send</button>
						<br></br>
						<a className="btn" href="/search">Back</a>
					</form>
						<br></br>
					<hr></hr>
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
			<hr></hr>
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
		<h1>... espera</h1>
	)
}

export default UserDetail
