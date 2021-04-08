/* home.js page */

import { customiseNavBar} from './browserUtility.js'

export async function setup() { /* Checks to see if the username has been stored, if no, login */
	console.log('HOME')
	const username = localStorage.getItem('username') 
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Frequently Asked Questions'
	const nav = ['home','logout', 'addQuestion']
	customiseNavBar(nav)
    document.querySelector('h2').innerText = `Welcome: ${username}`
}