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



//8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888



export async function daoSaveRId(id:Number, amount:Number, description: String, dateSubmitted:number, type: Number):Promise<reimbursement>
    let client:PoolClient
       
    try { 
        client = await connectionPool.connect()
        
        // send an insert that uses the id above and the user input
        let result = await client.query('INSERT INTO reimbursement.reimbursement ( author, amount, "dataSubmitted", "dataResolved", description, resolver, status,"type") values ($7,$8) RETURNING status;',
        [id, amount, dateSubmitted,'1-1-1970',description, 1,1, type])
        console.log( '  this is db   ' +result);
        
         if(result.rowCount===0){
             throw "Not Authorized";
             
         }
        status = result.rows[0].reimbursement
        return reimDTOReimConverter(result.rows[0])// convert and send back
    } catch(e){

        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}

