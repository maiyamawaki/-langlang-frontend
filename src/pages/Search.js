import React, {useState, useEffect, useContext} from 'react'
import { getAllUsers, getCurrentUser } from "../services"
import { Link } from 'react-router-dom';
import { Context } from "../context"

const Search = () => {
	const [users, setUsers] = useState(null);
	const { user, loginUser } = useContext(Context)
	const [ keyword, setkeyword ] = useState("")
	const [ arr, setArr ] = useState([])

	function searchOneUer(e){
		e.preventDefault();
		[...users].forEach((ele)=>{
			if(ele.living === keyword){
				setArr([...arr, ele])
				setkeyword("")
			}else if(ele.nativeLanguage === keyword){
				setArr([...arr, ele])
				setkeyword("")
			}
		})
	}
	console.log(arr)

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
				<form class="searchBar" onSubmit={searchOneUer}>
					<label for="oneUser"><h1>
					Search someone by country name o language
					</h1></label>
					<input type="text" name="keyword" value={keyword} onChange={e=>setkeyword(e.target.value)} />
					<button className="submitBtn" type="submit">Search</button>
						{arr.map((ele)=>{
							return(
								<Link to={`/search/${ele._id}`}>
								<div className="userCard">
									<div className="flex" key={ele._id}>
										<div>
											<img src={ele.photo}></img>
										</div>
										<div className="userDetail">
											<h2>{ele.name}</h2>
											<br></br>
											<p>From : {ele.from}</p>
											<p>Native language:{ele.nativeLanguage}</p>
											<p>Learning : {ele.learnLanguage}</p>
											<p>hobby : {ele.hobby}</p>
											<br></br>
											<hr></hr>
											<br></br>
											<p>{ele.about}</p>
											<br></br>
										</div>
									</div>
									</div>
								</Link>
							)
						})}
				</form>
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
											<br></br>
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
