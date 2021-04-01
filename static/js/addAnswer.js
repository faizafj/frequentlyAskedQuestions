
/* addAnswer.js */

import { customiseNavBar, getURL, showMessage, file2DataURI } from './browserUtility.js'

export async function setup() {
	console.log('FOO')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Answer a Question'
	const nav = ['home', 'logout']
	customiseNavBar(nav)
	document.querySelector('input[type="file"]').addEventListener('change', await displayImage)
    document.querySelector('form').addEventListener('submit', await addQuestion)
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
async function addAnswer(event) {
    console.log('addAnswer')
    event.preventDefault()
    const formData = {
        title: event.target.querySelector('input[name="title"]').value,
        summary: event.target.querySelector('input[name="summary"]').value,
        description: event.target.querySelector('textarea[name="description"]').value,
        topic: event.target.querySelector('select[name="topic"]').value,
        subtopic: event.target.querySelector('select[name="subtopic"]').value      
    }
    const image = event.target.querySelector('input[name="image"]')
    const files = image.files
    if (files[0]) {
        const file = files[0]
        const data = await file2DataURI(file)
        formData.image = data
    } console.log (formData)
     //post the questions data
    const baseURL = getURL()
    const url = `${baseURL}/answers`
    const options = {
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authorization')
    },
        body: JSON.stringify(formData)
   } 
    const response = await fetch (url, options)
    const json = await response.json()
    console.log(json)
} 