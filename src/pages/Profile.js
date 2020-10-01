import React, {useContext} from 'react'
import { Context } from "../context"
import { Link } from 'react-router-dom';

const Profile = () => {
	const { user } = useContext(Context)
	
	return user ? (
		<div className="user">
			<h1>Welcome {user?.name}</h1>
			<div className="userContainer">
				<div className="userFoto">
				<br></br>
				<img src={user?.photo} />
				<br></br>
				<br></br>
				<Link className="btn submitBtn" to="/profile/editprofile">Edit your profile</Link>
				</div>
				<br></br>
				<br></br>
				<div className="userCard">
					<p>From : {user?.from}</p>
					<p>Living : {user?.living}</p>
					<p>Native language : {user?.nativeLanguage}</p>
					<p>Learning : {user?.learnLanguage}</p>
					<p>Hobby : {user?.hobby}</p>
					<br></br>
					<hr style={{color : "#85d1ba"}}></hr>
					<br></br>
					<p>{user?.about}</p>
				</div>

				<div className="userBtns">
					<Link className="optionBtn" to="/search">Search</Link>
					<br></br>
					<Link className="optionBtn" to="/profile/msgs">Messsage</Link>
					<br></br>
					<Link className="optionBtn" to="/profile/info">Infomation</Link>
					<br></br>
					<Link className="optionBtn" to="/profile/material">Material</Link>
				</div>
			</div>
			<br></br>
		</div>
	):(
		<div>
			<h3>Please login...</h3>
		</div>
	)
}

export default Profile


