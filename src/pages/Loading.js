import React from 'react'
import { Link } from 'react-router-dom'

const Loading = () => {
	return (
		<div className="updated">
			<h2>The process was successful!!</h2>
			<Link className="backBtn" to="/profile">Back to profile</Link>
		</div>
	)
}

export default Loading
