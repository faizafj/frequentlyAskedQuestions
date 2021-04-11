
/* addQuestions.js */

import { customiseNavBar, getURL, showMessage, file2DataURI } from './browserUtility.js'

export async function setup() {
	console.log('addQuestions')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Add a question'
	const nav = ['home',  'questions' , 'addQuestion', 'logout']
	customiseNavBar(nav)
	document.querySelector('input[type="file"]').addEventListener('change', await displayImage)
    document.querySelector('form').addEventListener('submit', await addQuestion)
}

//displays image 
async function displayImage(event) {
    console.log('displayImage')
    const files = event.target.files
    const file = files[0]
    if (file) {
    const data = await file2DataURI(file)
    document.querySelector('form img').src = data
   }
}
async function addQuestion(event) {
    console.log('addQuestion')
    event.preventDefault()
    const formData = {
        title: event.target.querySelector('input[name="title"]').value,
        summary: event.target.querySelector('textarea[name="summary"]').value,
        description: event.target.querySelector('textarea[name="description"]').value,
        topic: event.target.querySelector('select[name="topic"]').value,
        subtopic: event.target.querySelector('select[name="subtopic"]').value      
    }
    console.log(formData)
    const image = event.target.querySelector('input[name="image"]')
    const files = image.files
    if (files[0]) {
        const file = files[0]
        const data = await file2DataURI(file)
        formData.image = data
    } console.log (formData)
     //post the questions data
    const baseURL = getURL()
    const url = `${baseURL}/questions`
    const options = {
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
    },
        body: JSON.stringify(formData)
   } 
    const response = await fetch (url, options)
    const json = await response.json()
    console.log(json)
    window.location.href = '#home' // redirects to homepage
    showMessage('Your Question Has Been Added')
} 