import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = process.env.FRONTENDPOINT)
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

export const editProfile = async () =>{
  await service.put("/profile/editProfile")
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

//Info
export const getInfos =  async () => {
  return await service.get("/profile/info")
}
export const getOneInfo = async (infoId) => {
  return await service.get(`/profile/info/${infoId}`)
}
export const createInfo =  async (newInfo) =>{
  return await service.post("/profile/info", newInfo)
}
