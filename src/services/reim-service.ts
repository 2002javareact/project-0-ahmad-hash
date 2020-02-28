import { reimbursement } from "../models/reimbursement";
import { daoFindReimByStatus,   daoSaveRId, daoFindRId } from "../repositories/reim-dao";

// this connect my request to the database.
export async function findReimByStatus(status:Number) : Promise<reimbursement>
{
    console.log('this is service:  ' +reimbursement); // test purposes
    
    return await daoFindReimByStatus (status)
}





export async function findRId(id:Number) : Promise<reimbursement> //changed to findRId
{

    return await daoFindRId(id)
}





export async function saveR(id:Number, amount:Number, description: String, date:Date, type: Number) : Promise<reimbursement>
{

    return await daoSaveRId(id, amount, description, date, type)
}