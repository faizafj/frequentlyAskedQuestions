
/* addQuestions.js */

import { customiseNavBar, showMessage, file2DataURI } from './browserUtility.js'

export async function setup() {
	console.log('FOO')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Add a question'
	const nav = ['logout', 'home']
	customiseNavBar(nav)
	document.querySelector('input[type="file"]').addEventListener('change', await displayImage)
}

async function displayImage(event) {
    console.log('displayImage')
    const files = event.target.files
    const file = files[0]
    if (file) {
    const data = await file2DataURI(file)
    document.querySelector('form img').src = data
   }
}