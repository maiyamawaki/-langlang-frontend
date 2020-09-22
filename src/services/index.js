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
export const updateProfilePhoto = async photo => {
  await service.put("/photo", {photo})
}


//View All users
export const getAllUsers = async() =>{
  return await service.get("/search")
}

//User Detail
export const getOneUser = async (userId) => {
  return await service.get(`/${userId}`)
}