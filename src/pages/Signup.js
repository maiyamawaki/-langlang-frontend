import React from 'react'
import { signup } from "../services"
import { Form, Input, Select } from "antd"

const {Option} = Select

const Signup = ({history}) => {
	const [form] = Form.useForm();

	async function signupProcess(values){
		await signup(values);
		history.push("/login")
	}

	return (
		<div>
			<Form onFinish={signupProcess} form={form}>
				<Form.Item label="Your email" name="email" rules={[{ required: true, message: "Plase input your email." }]}>
					<Input />
				</Form.Item>
				<br></br>
				<Form.Item label="Your username" name="name" rules={[{ required: true, message: "Please input your username" }]}>
					<Input />
				</Form.Item>
				<br></br>
				<Form.Item label="Your native language" name="nativeLanguage" rules={[{ required: true, message: "Please select your native language" }]}>
					<select name="nativeLanguage">
							<option value="English">English</option>
							<option value="Spanish">Spanish</option>
							<option value="Japanese">Japanese</option>
							<option value="Chinese">Chinese</option>
							<option value="French">French</option>
							<option value="Italian">Italian</option>
							<option value="Russian">Russian</option>
							<option value="German">German</option>
					</select>
				</Form.Item>
				<br></br>
				<Form.Item label="The language you want to learn" name="learnLanguage" rules={[{ required: true, message: "Please select the language you want to learn" }]}>
					<select name="nativeLanguage">
							<option value="English">English</option>
							<option value="Spanish">Spanish</option>
							<option value="Japanese">Japanese</option>
							<option value="Chinese">Chinese</option>
							<option value="French">French</option>
							<option value="Italian">Italian</option>
							<option value="Russian">Russian</option>
							<option value="German">German</option>
					</select>
				</Form.Item>
				<br></br>
				<Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password" }]}>
					<Input.Password />
				</Form.Item>
				<br></br>
				<button htmlType="submit">Signup</button>
			</Form>
		</div>
	)
}

export default Signup
