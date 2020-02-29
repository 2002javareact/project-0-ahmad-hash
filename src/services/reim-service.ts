import { reimbursement } from "../models/reimbursement";
import { daoFindReimByStatus,  daoFindRId, daosubmitNewReimbursement, daoupdateReimbursement } from "../repositories/reim-dao";
import { ReimDTO } from "../dtos/ReimDTO";

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

export async function submitNewReimbursement(newReimbursement:ReimDTO) : Promise<reimbursement>
{

    return await daosubmitNewReimbursement(newReimbursement)
}

export async function updateReimbursement(newReimbursement:ReimDTO) : Promise<reimbursement>
{

    return await daoupdateReimbursement(newReimbursement)
}