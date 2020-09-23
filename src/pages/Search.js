import React, {useState, useEffect} from 'react'
import { getAllUsers } from "../services"
import { Link } from 'react-router-dom';

const Search = () => {
	const [users, setUsers] = useState(null);
	// delete users.password

	useEffect(()=>{
		async function fetchUsers(){
			const {data : {users}} = await getAllUsers();
			delete users.password
			setUsers(users)
		}
		fetchUsers()
	},[])

	return users? (
		<div>
				{users.map((ele, index)=>{
					return(
						<Link to={`/search/${ele._id}`}>
							<div className="flex" key={ele._id}>
								<div>
									<img src={ele.photo}></img>
								</div>
								<div className="userDetail">
									<h2>{ele.name}</h2>
									<p>Native language:{ele.nativeLanguage}</p>
									<p>the language they want to learn:{ele.learnLanguage}</p>
								</div>
							</div>
						</Link>
					)
				})}
		</div>
	):(
		<h1>Loading</h1>
	)
}

export default Search
