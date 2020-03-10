import  express= require ('express')
import {logMiddleware} from './middleware/log_middleware'
import bodyParser = require('body-parser')
import {findUserByUsernameAndPassword} from "./services/user-services"
import { sessionMiddleware } from './middleware/session'
import { userRouter } from './router/user-router'
import { reimRouter } from './router/Reim-router'
import { corsFilter } from './middleware/cors-filter'


const pro = express()
pro.use('/',bodyParser.json())

pro.use(logMiddleware)
pro.use(sessionMiddleware)
pro.use(corsFilter)

pro.use('/users', userRouter)
pro.use('/reimbursements', reimRouter) // reimburstment route is here so skip it from the user.

pro.post('/login', async (req,res)=>{
    
    const {username, password} = req.body
    
    if(!username || !password){
        res.status(400).send('Please Include Username and Password')
    } else {
        try {
            let user = await findUserByUsernameAndPassword(username,password)
            req.session.user = user// adds an object for us to use for auth
            res.status(200).json(user)// we do this for ourselves, when we start working on front end
        } catch(e){
            res.status(e.status).send(e.message)
        }
    }
})


pro.listen(2222, ()=>{
    console.log('app has started on port 2222');
})