import React, {useEffect, useState} from 'react'
import {deleteMaterial, getMaterial} from "../services"

const DeleteMaterial = ({history, match : {params : {materialId}}}) => {
	const [oneMaterial, setOneMaterial] = useState(null)

	async function deleteOneMaterial(materialId){
		const material = await deleteMaterial(materialId);
		console.log(material);
		history.push("/profile");
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
			<button className="delete" onClick={()=>{deleteOneMaterial(`${oneMaterial._id}`)}}>Delete</button>
		</div>
	):(
		null
	)
}

export default DeleteMaterial
