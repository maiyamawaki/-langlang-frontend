import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = "https://git.heroku.com/sleepy-bayou-28569.git")
  : (baseURL = 'http://localhost:3000');

const service = axios.create({ withCredentials: true, baseURL });

//Auth
export const test = async () => {
  return await service.get("/")
}
export const signup = async user => {
  return await service.post("/signup", user)
}
export const login = async user => {
  return await service.post("/login", user)
}
export const logOut = async () => {
  return await service.get("/logout")
}
export const getCurrentUser = async () => {
  const {data:user} = await service.get("/profile")
  return user
}
export const logoutP = async () => {
  await service.get("/logout")
}
export const updatePhoto = async photo => {
  await service.put("/photo", {photo})
}

export const updateProfile = async (newPro) =>{
  await service.put("/profile/editProfile", newPro)
}


//View All users
export const getAllUsers = async() =>{
  return await service.get("/search")
}
//User Detail
export const getOneUser = async (userId) => {
  return await service.get(`/search/${userId}`)
}



//Comment 
export const createComment = async(userId, comment)=>{
  await service.post(`/search/${userId}`, comment)
}
export const getMsg = async(msgId)=>{
  const {data : msg}= await service.get(`/msgs/${msgId}`)
  return msg
}
export const deleteComment = async(msgId)=>{
  await service.delete(`/msgs/${msgId}`)
}

//Info
export const getInfos =  async () => {
  return await service.get("/profile/info")
}
export const createInfo =  async (newInfo) =>{
  return await service.post("/profile/info", newInfo)
}
export const getInfo = async(infoId)=>{
  const {data : info }= await service.get(`/info/${infoId}`)
  return info
}
export const deleteInfo = async(infoId)=>{
  await service.delete(`/info/${infoId}`)
}


//Materials
export const getMaterials = async()=>{
  await service.get("/profile/material")
}
export const createMaterial = async (newMaterial) =>{
  return await service.post("/profile/material", newMaterial)
}
export const getMaterial = async(materialId)=>{
  const {data : material }= await service.get(`/material/${materialId}`)
  return material
}
export const deleteMaterial = async(materialId)=>{
  await service.delete(`/material/${materialId}`)
}


