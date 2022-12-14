
/* register.js */

import { customiseNavBar, showMessage } from './browserUtility.js'

export async function setup() {
	document.querySelector('h1').innerText = 'Register a New Account'
	customiseNavBar(['allQuestions', 'register', 'login'])
	document.querySelector('form').addEventListener('submit', await register)
}

async function register() {
	event.preventDefault()
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	console.log(data)
	const url = '/api/v1.3/accounts'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
	const response = await fetch(url, options)
	const json = await response.json()
	console.log(json)
     if (response.status===400){
		showMessage('Username already exists')
	} else{
		showMessage('Account Added')
	}
	window.location.href = '#login'
}