/* home.js page */

import { customiseNavBar, getURL} from './browserUtility.js'

export async function setup() { /* Checks to see if the username has been stored, if no, login */
	console.log('HOME')
	const username = localStorage.getItem('username') 
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Questions'
	const nav = ['home','logout', 'questions', 'addQuestion']
	customiseNavBar(nav)
    await showQuestions (username)
}
async function showQuestions(username){
    console.log (`username: ${username}`)
    const baseURL = getURL()
    const url = `${baseURL}/questions`
    const options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authorization')
        }
    }
    const response = await fetch(url, options)
    const json = await response.json()
    console.log(json)
    let content = ''
    json.data.forEach(question => {
        const img = question.image ? question.image: 'placeholder.png' //if no image a default image added
        const date = new Date(question.dateCreated)
        const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        content += `<tr><td>${question.title}</td> <br> <td><img src="/uploads/${img}" /> <td>${question.summary}</td> <td>${dateString}</td> </tr>`
    })
    
    document.querySelector('figure > table').innerHTML = content
}