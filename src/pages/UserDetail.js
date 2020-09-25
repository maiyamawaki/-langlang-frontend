import React,{useEffect, useState} from 'react'
import { getOneUser, createComment} from "../services"
import { Form } from "antd"


const UserDetail = ({history, match : {params : {userId}}}) => {
	const [form] = Form.useForm();
	const [oneUser, setOneUser] = useState(null)
	
	async function sendComment (values){
		const {data :{user}} = await getOneUser(userId)
		await createComment(user._id, values)
		history.push("/search")
	}

	useEffect(()=>{
		async function fetchOneUser(){
			const {data : {user}} = await getOneUser(userId)
			setOneUser(user)
		}
		fetchOneUser()
	},[])


	return oneUser ? (
		<div className="container detail">
			<img src={oneUser.photo}></img>
			<h1>{oneUser.name}</h1>
			<p>Native language:{oneUser.nativeLanguage}</p>
			<p>the language they want to learn:{oneUser.learnLanguage}</p>
			<div class="comment">
				<h3>Send message</h3>
				<Form onFinish={sendComment} form={form}>
					<Form.Item label="Context" name="context" rules={[{ required: true, message: "Plase input comment" }]}>
						<input className="input"/>
					</Form.Item>
					<button type="submit">Send</button>
				</Form>
			</div>
		</div>
	):(
		<h1>... espera</h1>
	)
}

export default UserDetail
