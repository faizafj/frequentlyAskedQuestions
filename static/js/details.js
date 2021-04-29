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
    document.body.style.backgroundImage = "url('uploads/backgroundDesign.png')"
    document.body.style.backgroundSize = "50%"
    
}


async function showQuestions(username, querystring){
    console.log (`username: ${username}`)
    const baseURL = getURL()
    const url = `${baseURL}/api/v1.3/questions/${querystring.id}`
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
        descriptionFormat = descriptionFormat.replace(/^<p>|<\/p>$/g,  '') 
        const img = question.image ? question.image: 'placeholder.png' //if no image a default image added
        const date = new Date(question.dateCreated)
        const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        content += ` <article id="details"> <section> Question: ${question.title}</section> 
        <section id= "1"> <center> <img src="/uploads/${img}" /> </center> </section>
        <section id="2"> ${descriptionFormat} </section> 
        <section id="3"> Date Posted: ${dateString}  <br> Posted By: ${question.user}</section>  </article>`
    })
    
    document.querySelector('main > article').innerHTML = content
}