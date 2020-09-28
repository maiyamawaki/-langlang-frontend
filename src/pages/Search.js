import React, {useState, useEffect, useContext} from 'react'
import { getAllUsers, getCurrentUser } from "../services"
import { Link } from 'react-router-dom';
import { Context } from "../context"

const Search = () => {
	const [users, setUsers] = useState(null);
	const { user, loginUser } = useContext(Context)
	const { lang, setOneLang } = useState("")

	function searchOneUer(e){
		e.preventDefault();
		[...users].forEach((ele)=>{
			if(ele.nativeLanguage === lang){
				console.log(ele)
				setOneLang([...lang, ele])
			}
		})
	}
	console.log(lang)

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
		<br></br>
		<br></br>
		<br></br>
				{/* <form class="searchBar" onSubmit={()=>{searchOneUer(lang)}}>
					<label for="oneUser"><h1>
					Search someone by oneUser
					</h1></label>
					<input type="text" name="lang" value={lang} onChange={e=>setOneLang(e.target.value)} />
					<button className="btn	" type="submit">Search</button>
				</form> */}
			<div className="cards">
			<br></br>
			<br></br>
				{users.map((ele, index)=>{
					if(ele.email !== user.email){
						return(
							<div className="card">
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
		</div>
			):(
				<h1>Loading</h1>
			)
}

export default Search
