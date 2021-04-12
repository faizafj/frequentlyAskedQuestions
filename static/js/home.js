/* home.js page */

import { customiseNavBar, getURL} from './browserUtility.js'

export async function setup() { /* Checks to see if the username has been stored, if no, login */
	console.log('HOME')
	const username = localStorage.getItem('username') 
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Frequently Asked Questions'
	const nav = ['home','logout', 'questions' , 'addQuestion']
	customiseNavBar(nav)
    var d = new Date();
    var dates =  d.getHours()
    if(dates >= 0 && dates < 12) { //less than 12
          document.querySelector('h2').innerText = `Good Morning ${username}!`
    } else if (dates >= 12 && dates <= 17) {
         document.querySelector('h2').innerText = `Good Afternoon ${username}!`
    } else {
        document.querySelector('h2').innerText = `Good Evening ${username}!`}
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
        content += `<tr></td><td>${question.title}</td> <br> <td><img src="/uploads/${img}" /> <td>${question.summary}</td> <td>${dateString}</td> </tr>`
    })
    
    document.querySelector('figure > table').innerHTML = content
}