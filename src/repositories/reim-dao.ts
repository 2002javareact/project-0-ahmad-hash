import { reimbursement } from "../models/reimbursement";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { reimDTOReimConverter } from "../util/reim_dto_to_reim";
import { invalidCredentialsError, InternalServerError } from "../errors/log_Error";
import { ReimDTO } from "../dtos/ReimDTO";

export async function daoFindReimByStatus(status):Promise<reimbursement>
{
    let client:PoolClient
    try {
        client = await connectionPool.connect()
        console.log('before sellection    ='  +status);
        
        let results = await client.query
        ('SELECT * FROM reimbursement.reimbursement r WHERE status = $1 ', [status])
        if(results.rowCount === 0){
            throw new Error('Rembursement Not Found')
        }
        console.log(results);
        
        return reimDTOReimConverter(results.rows[0])
    } catch(e){
        console.log(e);
        if(e.message === 'Rembursement Not Found'){
            throw new invalidCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        console.log('DB connection had been Terminated');
        
        client && client.release()
    }
}
//**************************************************** */

export async function daoFindRId(id):Promise<reimbursement>
{
    let client:PoolClient
    try {
        client = await connectionPool.connect()
        console.log('before sellection    ='  +id);
        
        let results = await client.query
        ('SELECT * FROM reimbursement.reimbursement r where author = $1', [id])

        //
        if(results.rowCount === 0){ // Query is save in the results object.
            throw new Error('Rembursement Not Found')
        }
        console.log(results);
        
        return reimDTOReimConverter(results.rows[0])
    } catch(e){
        console.log(e);
        if(e.message === 'Rembursement Not Found'){
            throw new invalidCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        console.log('DB connection had been Terminated');
        
        client && client.release()
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function daosubmitNewReimbursement(newReimbursement:ReimDTO):Promise<reimbursement> {
    let client:PoolClient
    try { 
        client = await connectionPool.connect()

        let result = await client.query
        ('Insert into reimbursement.reimbursement ( author ,amount ,"dateSubmitted" ,"dateResolved" ,description ,resolver ,status ,"type" ) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING "reimbursementId";'
        ,/*[id,amount,date,'01-01-1111',description,3,1,type]*/
        
        [ +newReimbursement.author , newReimbursement.amount, newReimbursement.dateSubmitted,'01-01-1970', newReimbursement.description
            ,2,1, newReimbursement.type])
        // console.log( '  this is db   ' +result);
        // put that newly genertaed user_id on the DTO 
        newReimbursement.reimbursementId = result.rows[0].reimbursementId
        return reimDTOReimConverter(newReimbursement)// convert and send back
    } catch(e){
        console.log(e);
        
        throw new invalidCredentialsError()
    } finally {
        client && client.release()
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function daoupdateReimbursement(newReimbursement:ReimDTO):Promise<reimbursement> {
    let client:PoolClient
    //console.log('this is dao function   '+ ReimDTO);
    try { 
        client = await connectionPool.connect()
        // send a query and immeadiately get the role id matching the name on the dto
       //  let role_Id = (await client.query('SELECT * FROM reimbursement.roles WHERE "role" =  $1', [newUser.role])).rows[0].roleId
        let result = await client.query('update reimbursement.reimbursement set "reimbursementId" =$1,author =$2 , amount =$3, "dateSubmitted" =$4,"dateResolved" =$5,description =$6,resolver =$7,status =$8,"type" =$9 where "reimbursementId" =$1  RETURNING "reimbursementId" ;',
        [newReimbursement.reimbursementId, +newReimbursement.author , newReimbursement.amount, newReimbursement.dateSubmitted,newReimbursement.dateResolved, newReimbursement.description
            ,newReimbursement.resolver,newReimbursement.status, newReimbursement.type])
        // console.log( '  this is db   ' +result);
        // put that newly genertaed user_id on the DTO 
        newReimbursement.reimbursementId = result.rows[0].reimbursementId
        return reimDTOReimConverter(newReimbursement)// convert and send back
    } catch(e){
       // console.log(e);
        
        throw new invalidCredentialsError()
    } finally {
        client && client.release()
    }
}



