
/* logout */
import {showMessage } from './browserUtility.js'


export async function setup() {
	console.log('LOGOUT')
    showMessage('You have successfully logged out - Goodbye!')
	localStorage.removeItem('username')
	localStorage.removeItem('authorization')
	window.location.href = '#allQuestions'
    
}
