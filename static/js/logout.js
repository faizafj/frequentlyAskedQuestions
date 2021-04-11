
/* logout */
import {showMessage } from './browserUtility.js'


export async function setup() {
	console.log('LOGOUT')
    showMessage('You have successfully logged out')
	localStorage.removeItem('username')
	localStorage.removeItem('Authorization')
	window.location.href = '#login'
    
}
