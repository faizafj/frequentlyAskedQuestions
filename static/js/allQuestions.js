/* home.js page */

import { customiseNavBar, getURL} from './browserUtility.js'

export async function setup() { /* Checks to see if the username has been stored, if no, login */
	console.log('HOME')
	const username = localStorage.getItem('username') 
	console.log(`username: ${username}`)
	document.querySelector('h1').innerText = 'Frequently Asked Questions'
	const nav = ['allQuestions','login', 'register']
	customiseNavBar(nav)
     await showQuestions (username)
    document.body.style.backgroundImage = "url('uploads/backgroundDesign.png')"
    document.body.style.backgroundSize = "50%"
}



async function showQuestions(username){
    const baseURL = getURL()
    const url = `${baseURL}/api/v1.3/questions`
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
        const img = question.image ? question.image: 'placeholderImage.png' //if no image a default image added
        const date = new Date(question.dateCreated)
        const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        const username = question.userid
        content += `<article>    
        <section> 
        <h2> Question: ${question.title}  </h2>  <br>
        <center> <img src="/uploads/${img}" />  </center> <br>
        <br> Summary: ${question.summary} 
        <br> <button> <a href=/#login> Please login to view details  </a> </button> <br>
          <br> <p> Date Posted: ${dateString} <br> Posted By: ${question.user} </p> </section> </article>`
    }) //use grid instead article, sections in the article styled as table grid rows  4 rows 
    
    document.querySelector('main > article').innerHTML = content
}