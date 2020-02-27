import express = require('express')
import { auth, authId } from '../middleware/auth-middleware'
import { findReimByStatus, findReimById } from '../services/reim-service'
export const reimRouter=express.Router()



reimRouter.get('/status/:status',auth(['1','2', '3']),authId ,async(req,res)=>
{
    const status = +req.params.status// the plus sign is to type coerce into a number
    if(isNaN(status)){
        res.sendStatus(400)
    }else {
        try{
            let reimbursement = await findReimByStatus(status)
            console.log('returning router value')// jsut to check bug
            console.log(reimbursement)//
            console.log(findReimByStatus(status));//
            
            res.json(reimbursement)
            }
        catch(e){
            res.status(e.status).send(e.message)
            }//xhr, aws, javascript DOM, html node, agile we gonna do tmr
      
        
    }
})


reimRouter.get('/author/userId/:id', auth(['1','2', '3']),authId ,async(req,res)=>
{
//const id =+
const id = +req.params.id //fix the variable type from string to the number.
console.log(id);

if(isNaN(id)){ //if tis is not a numbr it will send 400, Not a function, just a message.
    res.sendStatus(400)
}else {
    try{
    let reimbursement = await findReimById(id) // this takes the answer and convert it into the object because 
    console.log('to check the error') 
    res.json(reimbursement) // this object send the response to the json and convert it back in the end.
} catch (e){
    res.status(e.status).send(e.message) //just part of try catch the syntax.
}

}
})