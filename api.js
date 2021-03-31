
/* api.js */

import { Router } from 'https://deno.land/x/oak@v6.3.2/mod.ts'
import { extractCredentials, saveFile } from './modules/util.js'
import { login, register } from './modules/accounts.js'
import { add } from './modules/questions.js'

const router = new Router()

// the routes defined here
router.get('/', async context => {
	const data = await Deno.readTextFile('static/index.html')
	context.response.body = data
})

router.get('/accounts', async context => {
	console.log('GET /accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify({ status: 'success', data: { username } }, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'unauthorised', msg: err.msg })
	}
})

router.post('/accounts', async context => {
	console.log('POST /accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})

router.post ('/questions', async context => {
    console.log('POST /questions')
    let user = null
    try {
    const token = context.request.headers.get ('Authorization')
    if(!token) throw new Error ('missing Authorization header')
        const credentials = extractCredentials(token)
        user = await login (credentials)
    } catch(err) {
        context.response.status = 401
        context.response.body = { status: 'unauthorized', msg: 'Basic Authentication required', log: err.message } //returned if there's auth issues
     return
}
    //After the credentials are checked, adding the question.
try {
    const { value } = context.request.body ({type: 'json'});
    const data = await value 
    data.username = user
    const result = await add(data)
} catch(err){
    context.response.status = 400
    context.response.body - { status: 'error', msg: 'Question Not Added', log: err.message }
return 
}
    context.response.status = 201
    context.response.body = JSON.stringify(context.response.body = { status: 'added', msg: 'New contact added'}, null, 2)
})

router.get("/(.*)", async context => {      
	const data = await Deno.readTextFile('static/404.html')
	context.response.body = data
})

export default router
