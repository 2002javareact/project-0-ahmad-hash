import express = require('express')
import { auth, authId } from '../middleware/auth-middleware'
import { findReimByStatus, findRId,  submitNewReimbursement, updateReimbursement } from '../services/reim-service'
import { ReimDTO } from '../dtos/ReimDTO'


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
const id = +req.params.id //fix the variable type from string to the number.
console.log(id);

if(isNaN(id)){ //if tis is not a numbr it will send 400, Not a function, just a message.
    res.sendStatus(400)
}else {
    try{
    let reimbursement = await findRId(id) // this takes the answer and convert it into the object because 
    console.log('to check the error') 
    res.json(reimbursement) // this object send the response to the json and convert it back in the end.
} catch (e){
    res.status(e.status).send(e.message) //just part of try catch the syntax.
}
}
})
//*****************************************************************************************************************************************************/
reimRouter.post('',auth(['1','2','3']),authId ,async(req,res)=>
{
    try {
        const {
            author,
            amount,
            dateSubmitted,
            dateResolved,
            description,
            resolver,
            status,
            type            
        }:{
            author:String
            amount:number
            dateSubmitted:Date
            dateResolved:Date
            description:String
            resolver:String
            status:String
            type:String
        }=req.body

        if(author && amount && dateSubmitted &&  description &&  type)
        {       
            let newReimbursement = await submitNewReimbursement(new ReimDTO(
               0, author, amount,
                 dateSubmitted, 
                 dateResolved, description,
                 resolver,
                 status,type)
            )
            res.status(201).json(newReimbursement);
        } else {
            res.status(400).send('Please include all user fields')
        }
            } catch (e) {
                res.status(400).send('incorrect information')
            
            }}
        )

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        reimRouter.patch('',auth(['1','2']),authId ,async(req,res)=>
{
    try {
        const {
            reimbursementId,
            author,
            amount,
            dateSubmitted,
            dateResolved,
            description,
            resolver,
            status,
            type            
        }:{
            reimbursementId:number
            author:String
            amount:number
            dateSubmitted:Date
            dateResolved:Date
            description:String
            resolver:String
            status:String
            type:String
        }=req.body


        if(author && amount && dateSubmitted && dateResolved && description && resolver && status&&type)
        {       
            let newReimbursement = await updateReimbursement(new ReimDTO(
                reimbursementId, author, amount,
                 dateSubmitted, 
                 dateResolved, description,
                 resolver,
                 status,type)
            )
    // this would be some function for adding a new user to a db
            res.status(201).json(newReimbursement);
        } else {
            res.status(400).send('Please include all user fields')
            // for setting a status and a body
        }
            } catch (e) {
                res.status(400).send('Please enter valid information')
            }}
        )
        