import React, { useState } from 'react'
import { Form } from "antd"
import { createComment, getOneUser } from "../services"

const Comment = ({match : {params : {userId}}}) => {
	const [form] = Form.useForm();
	console.log(userId)

	
	async function sendComment (values){
		const {data :{user}} = await getOneUser(userId)
		console.log(user)
		await createComment(user, {values})
	}

	return (
		<div>
			<h1>Comment</h1>
			<Form onFinish={sendComment} form={form}>
				<Form.Item label="Context" name="context" rules={[{ required: true, message: "Plase input comment" }]}>
					<input />
				</Form.Item>
				<button type="submit">Send</button>
			</Form>
		</div>
	)
}

export default Comment
