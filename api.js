
/* api.js */

import { Router } from 'https://deno.land/x/oak@v6.3.2/mod.ts'
import { extractCredentials, saveFile } from './modules/util.js'
import { login, register } from './modules/accounts.js'
import { add, getAll, getDetails} from './modules/questions.js'

const router = new Router()

// the routes defined here
router.get('/', async context => {
	const data = await Deno.readTextFile('static/index.html')
	context.response.body = data
})

router.get('/api/v1.3/accounts', async context => {
	console.log('GET /accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const details = await login(credentials)
        const username = details.username
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify({status: 'success', data: { username } }, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'unauthorised', msg: err.msg })
	}
})

router.post('/api/v1.3/accounts', async context => {
	console.log('POST /accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	try{
		await register(data)
		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
	} catch(err){
		context.response.status = 400
		context.response.body = JSON.stringify({ status: 'unsuccessful', msg: err.msg })
	}
})


router.post ('/api/v1.3/questions', async context => {
    console.log('POST /questions')
    let user = null
    try {
    const token = context.request.headers.get ('Authorization')
    if(!token) throw new Error ('missing Authorization header')
        const credentials = extractCredentials(token)
        const details = await login (credentials)
        console.log(details)
        user = details.username
    } catch(err) {
        context.response.status = 401
        context.response.body = { status: 'unauthorised', msg: 'Basic Authentication required', log: err.message } //returned if there's auth issues
        return
}
    //After the credentials are checked, adding the question.
     try {
        const {value} = context.request.body ({type: 'json'});
        const data = await value 
        data.user = user
        const result = await add(data)
} catch(err){
    context.response.status = 400
    context.response.body = { status: 'error', msg: 'Question Not Added', log: err.message }
    return 
}
    context.response.status = 201
    context.response.body = JSON.stringify(context.response.body = { status: 'added', msg: 'The question has been added'}, null, 2)
})


//get questions
router.get ('/api/v1.3/questions', async context => {
    console.log('GET /questions')
  try { 
        const questions = await getAll()
        context.response.status = 200
        context.response.body = { status: 'success', data: questions }
    } catch(err){
        console.log(err)
}
})


router.get ('/api/v1.3/questions/:id', async context => {
    console.log('GET /questions')
    let user = null //set null to run try/catch
    try {
        const token = context.request.headers.get ('Authorization')
        if(!token) throw new Error ('Missing authorisation header')
        const credentials = extractCredentials(token)
        user = await login(credentials) //return username
    } catch(err) {
        context.response.status = 401
        context.response.body = { status: 'unauthorised', msg: 'Basic Authentication required', log: err.message } //returned if there's auth issues
        return
    }
  try { 
        console.log(user)
        const questions = await getDetails(context.params.id)
        context.response.status = 200
        context.response.body = { status: 'success', data: questions }
    } catch(err){
        console.log(err)
}
})

router.post ('/api/v1.3/files', async context => {
    console.log('POST /files')
    try {
        const token = context.request.headers.get('Authorization')
        console.log (`auth: ${token}`)
        const body = await context.request.body()
        const data = await body.value 
        console.log (data)
        saveFile(data.base64, data.user)
        context.response.status = 201
        context.response.body = JSON.stringify({status: 'success', msg: 'file uploaded'})
    } catch (err) {
        context.response.status = 401
        context.response.body = JSON.stringify({status: 'unauthorised', msg: err.msg })
    }
})


router.get("/(.*)", async context => {      
	const data = await Deno.readTextFile('static/404.html')
	context.response.body = data
})

export default router
