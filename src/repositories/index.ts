// we have index.ts in every single folder
// this is where we set up our connection factory
//one of the most expensive parts of connecting to db is making the connections.'
//so we make the connection from connection pool and never disconnect it so function go to connection pool and ask it to provide the function and then func close it and rerturn it.

import {Pool} from 'pg';

export const connectionPool : Pool = new Pool ({
    host: process.env['ad_Host'],
    user: process.env['ad_user'],
    password: process.env['ad_pass'],
    database: process.env['ad_db'],
    port: 5432,
    max: 5
    
})
