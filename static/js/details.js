/* home.js page */

import { customiseNavBar, getURL} from './browserUtility.js'

export async function setup(route, querystring) { /* Checks to see if the username has been stored, if no, login */
	console.log('HOME')
	const username = localStorage.getItem('username') 
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Questions Detail'
	const nav = ['home','logout', 'addQuestion']
	customiseNavBar(nav)
   await showQuestions (username, querystring)
}


async function showQuestions(username, querystring){
    console.log (`username: ${username}`)
    const baseURL = getURL()
    const url = `${baseURL}/questions/${querystring.id}`
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
    const conv = new showdown.Converter()
    json.data.forEach(question => {
        let descriptionFormat = conv.makeHtml(question.description)
        descriptionFormat = descriptionFormat.replace(/^<p>|<\/p><ul>|<\/ul>$/g,  '') 
        const img = question.image ? question.image: 'placeholder.png' //if no image a default image added
        const date = new Date(question.dateCreated)
        const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        content += ` <center> <tr id="titleName"></td><td> Question: ${question.title}</td> </tr>
        <tr> <br> <td><img src="/uploads/${img}" /> </tr>
        <tr id= "questionInfo"> <td>${descriptionFormat} </td> </tr> 
        <tr id="DateName"> <td> Date Posted: ${dateString}  <br> Posted By:${username}</td></tr> </center>`
    })
    
    document.querySelector('main > table').innerHTML = content
}