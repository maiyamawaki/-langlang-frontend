import React, {useState, useEffect, useContext} from 'react'
import { getAllUsers, getCurrentUser } from "../services"
import { Link } from 'react-router-dom';
import { Context } from "../context"

const Search = () => {
	const [ users, setUsers] = useState(null);
	const { user, loginUser } = useContext(Context)
	const [ keyword, setkeyword ] = useState("")
	const [ result, setResult ] = useState("")

	function searchOneUer(e){
		e.preventDefault();
		[...users].forEach((ele)=>{
			if(ele.nativeLanguage === keyword){
				setResult(ele)
				setkeyword("")
			}
			if(ele.living === keyword){
				setResult(ele)
				setkeyword("")
			}
			if(ele.from === keyword){
				setResult(ele)
				setkeyword("")
			}
		})
	}

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
		<div className="search">
		<br></br>
		<br></br>
		<br></br>
				<form className="searchBar" onSubmit={searchOneUer}>
					<label>
					<h1>
					Search someone by country name o language
					</h1>
					</label>
					<input type="text" name="keyword" value={keyword} onChange={e=>setkeyword(e.target.value)} />
					<button className="submitBtn" type="submit">Search</button>
				  {result ? (<Link to={`/search/${result._id}`}>
							<dvi className="cards">
								<div className="card">
									<div className="flex" key={result._id}>
										<div>
											<img src={result.photo}></img>
										</div>
										<div className="userDetail">
											<h2>{result.name}</h2>
											<br></br>
											<p>From : {result.from}</p>
											<p>Native language:{result.nativeLanguage}</p>
											<p>Learning : {result.learnLanguage}</p>
										</div>
									</div>
								</div>
							</dvi>
								</Link>):
								(
									null
								)}
				</form>
			<div className="cards">
			<br></br>
			<br></br>
				{users.map((ele, index)=>{
					if(ele.email !== user.email){
						return(
							<div key={ele._id} className="card">
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
