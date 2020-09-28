import React, {useState,useEffect} from 'react'
import {getOneUesrFromProfile, createComment} from "../services"
import { Form } from "antd"

const UserDetailForChat = ({match : {params : {id}}}) => {
	const [oneUser, setOneUser] = useState(null)
	const [form] = Form.useForm();

	async function sendComment (values){
		const {data :{user}} = await getOneUesrFromProfile(id)
		await createComment(user._id, values)
	}

	useEffect(()=>{
		async function fetchOneUser(){
			const {data : {user}} = await getOneUesrFromProfile(id)
			setOneUser(user)
		}
		fetchOneUser()
	},[])
	
	return  oneUser ? (
		<div className="container detail">
			<h1>{oneUser.name}</h1>
			<div class="comment">
				<h3>Comment</h3>
				<Form onFinish={sendComment} form={form}>
					<Form.Item label="Context" name="context" rules={[{ required: true, message: "Plase input comment" }]}>
						<input />
					</Form.Item>
					<button className="btn" type="submit">Send</button>
				</Form>
			</div>
			<button>
				<a href="/search">Back</a>
			</button>
		</div>
	):
	(
		<div>
			<h3>Loading...</h3>
		</div>
	)
}

export default UserDetailForChat
