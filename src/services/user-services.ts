import { daoFindUserByUsernameAndPassword, daoFindAllUsers, daoSaveOneUser, daoFindUserById, daoUpdateUser} from "../repositories/user-dao"
import {  User } from "../models/user"
import { UserDTO } from "../dtos/UserDTO"



export async function findUserByUsernameAndPassword(username:string, password:string): Promise<User> // for log in
{
    return daoFindUserByUsernameAndPassword(username,password)

}



export async function findAllUsers():Promise<User[]>{ // find all users
    
    return await daoFindAllUsers()
 }
 
 
 
 export async function saveOneUser(newUser:UserDTO):Promise<User> // enter the username post
 {

    return await daoSaveOneUser(newUser)
 }
 
 


 
 export async function findUserById(id:number):Promise<User>{ // find by user ID
    return await daoFindUserById(id)
 }




export async function updateUsers(newUser:UserDTO):Promise<User>{ // this is is for users patch

   return await daoUpdateUser(newUser)
}
 
