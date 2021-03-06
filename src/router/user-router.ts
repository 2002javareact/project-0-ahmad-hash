import express = require('express')
import { auth,  authId } from '../middleware/auth-middleware'
import { User } from '../models/user';
import { findAllUsers, findUserById, saveOneUser, updateUsers } from '../services/user-services';
import { UserDTO } from '../dtos/UserDTO';


export const userRouter=express.Router()


userRouter.get('', [auth(['1','2']),  async (req,res)=>
{
    let users:User[] = await findAllUsers(); 
    res.json(users)
}]);




userRouter.post('', auth(['1']), async (req,res)=>
{
    let {
         username, password, 
        emailAddress, id,
        firstName, lastName,
        role
        }:
        {
            username:String,
            password:String,
            emailAddress:String,
            id:number,
            firstName:String,
            lastName:String,
            role:String
        }= req.body// data is in the body of this request
    //String of json, not a js object
    //console.log(username,...
    
    if(username && password && emailAddress && id && firstName && lastName && role)
    {       
        let newUser = await saveOneUser(new UserDTO(
                                            0,
                                            username, password, 
                                            firstName, lastName,
                                            emailAddress,
                                            0,role)
                                        )
                                        console.log(newUser);
                                        
// this would be some function for adding a new user to a db
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Please Include all user fields')
        // for setting a status and a body
    }
})




  

userRouter.get('/:id', auth(['1', '2', '3']), authId, async (req,res)=>{
    const id = +req.params.id// the plus sign is to type coerce into a number
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
            let user = await findUserById(id)
            res.json(user)
            }
        catch(e){
            res.status(e.status).send(e.message)
            }
      
        
    }
})
//*************************************************************************************************************************************************** */

userRouter.patch('', auth(['1']), async (req,res)=>
{
    let {
         username, password, 
        emailAddress, id,
        firstName, lastName,
        role
        }:
        {
            id:number,
            username:String,
            password:String,
            emailAddress:String,
            firstName:String,
            lastName:String,
            role:String
        }= req.body// this is where the request body data is, which is sent in the request.
    // console.log test here
    
    if(username && password && emailAddress && id && firstName && lastName && role)
    {       
        let newUser = await updateUsers(new UserDTO(
                                            id,
                                            username, password, 
                                            firstName, lastName,
                                            emailAddress,
                                            0,role)
                                        )
                                        console.log(newUser);// for the testing purposes
                                        
// this would be some function for adding a new user to a db
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Please Include all uuser fields')
        // for setting a status and a body
    }
})


