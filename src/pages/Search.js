import React, {useState, useEffect, useContext} from 'react'
import { getAllUsers, getCurrentUser } from "../services"
import { Link } from 'react-router-dom';
import { Context } from "../context"

const Search = () => {
	const [users, setUsers] = useState(null);
	const { user, loginUser } = useContext(Context)

	useEffect(()=>{
		async function fetchUsers(){
			const {data : {users}} = await getAllUsers();
			delete users.password
			setUsers(users)
			const { user } = await getCurrentUser()
			loginUser(user)
		}
		fetchUsers()
	},[])

	return users? (
		<div class="search">
				{users.map((ele, index)=>{
					if(ele.email !== user.email){
						return(
							<div>
								<Link to={`/search/${ele._id}`}>
									<div className="flex" key={ele._id}>
										<div>
											<img src={ele.photo}></img>
										</div>
										<div className="userDetail">
											<h2>{ele.name}</h2>
											<p>From : {ele.from}</p>
											<p>Native language:{ele.nativeLanguage}</p>
											<p>Learning : {ele.learnLanguage}</p>
										</div>
									</div>
								</Link>
							</div>
						)
					}
				})}
		</div>
			):(
				<h1>Loading</h1>
			)
}

export default Search
