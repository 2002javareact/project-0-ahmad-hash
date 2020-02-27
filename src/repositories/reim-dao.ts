import { reimbursement } from "../models/reimbursement";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { reimDTOReimConverter } from "../util/reim_dto_to_reim";
import { invalidCredentialsError, InternalServerError } from "../errors/log_Error";

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

export async function daoFindReimById(id):Promise<reimbursement>
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