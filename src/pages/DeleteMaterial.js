import React, {useEffect, useState} from 'react'
import {deleteMaterial, getMaterial} from "../services"
import { useHistory } from "react-router-dom"

const DeleteMaterial = ({match : {params : {materialId}}}) => {
	const [oneMaterial, setOneMaterial] = useState(null)
	const history = useHistory()

	async function deleteOneMaterial(e){
		e.preventDefault()
		const material = await deleteMaterial(materialId);
		console.log(material);
		history.push("/loading");
	}

	useEffect(()=>{
		async function fetchOneMaterial(){
			const {material} = await getMaterial(materialId)
			setOneMaterial(material)
		}
		fetchOneMaterial()
	},[])

	return oneMaterial? (
		<div className="confirm">
			<h2>Are you sure to delete this study material?</h2>
			<button className="delete" onClick={deleteOneMaterial}>Delete</button>
		</div>
	):(
		null
	)
}

export default DeleteMaterial
