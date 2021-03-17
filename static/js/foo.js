
/* foo.js */

import { customiseNavBar, file2Base64, showMessage } from './browserUtility.js'

export async function setup() {
	console.log('FOO')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Secure Foo Page'
	const nav = ['logout', 'foo']
	customiseNavBar(nav)
	document.querySelector('form').addEventListener('submit', await uploadData)
}

async function uploadData(event) {
	event.preventDefault()
	const element = document.querySelector('input[name="file"]')
	console.log(element)
	const file = document.querySelector('input[name="file"]').files[0]
	file.base64 = await file2Base64(file)
	file.user = localStorage.getItem('username')
	console.log(file)
	const url = '/files'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(file)
	}
	const response = await fetch(url, options)
	console.log(response)
	const json = await response.json()
	console.log(json)
	showMessage('file uploaded')
}
