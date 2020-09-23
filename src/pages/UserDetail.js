import React,{useEffect, useState, useContext} from 'react'
import { getOneUser, createComment } from "../services/index"
import { Link } from "react-router-dom"
import { Form } from "antd"
import { Context } from "../context"


const UserDetail = ({match : {params : {userId}}}) => {
	const [form] = Form.useForm();
	const [oneUser, setOneUser] = useState(null)
	const { user } = useContext(Context)

	
	async function sendComment (values){
		const {data :{user}} = await getOneUser(userId)
		console.log(user._id)
		console.log(values)
		await createComment(user._id, values)
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
				<h3>Comment</h3>
				<Form onFinish={sendComment} form={form}>
					<Form.Item label="Context" name="context" rules={[{ required: true, message: "Plase input comment" }]}>
						<input />
					</Form.Item>
					<button type="submit">Send</button>
				</Form>
				{oneUser.comments.length !== 0 && (
					<div>
						{oneUser.comments.map((com, index)=>{
							return(
								<div>
									<p>{com.owner}</p>
									<p>{com.context}</p>
								</div>
							)
						})}
					</div>
				)}
			</div>
			<button>
				<a href="/search">Back</a>
			</button>
		</div>
	):(
		<h1>... espera</h1>
	)
}

export default UserDetail
