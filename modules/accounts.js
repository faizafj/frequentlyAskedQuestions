
/* accounts.js */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'
import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)

export async function login(credentials) {
	const { user, pass } = credentials
	let sql = `SELECT count(id) AS count FROM accounts WHERE user="${user}";`
	let records = await db.query(sql)
	if(!records[0].count) throw new Error(`username "${user}" not found`)
	sql = `SELECT pass FROM accounts WHERE user = "${user}";`
	records = await db.query(sql)
	const valid = await compare(pass, records[0].pass)
	if(valid === false) throw new Error(`invalid password for account "${user}"`)
    sql = `SELECT id AS userid, user AS username FROM accounts WHERE user="${user}";`
    console.log (sql)
    records = await db.query(sql)
	return records[0]
}


export async function register(credentials) {
	let sql, records
	credentials.pass = await hash(credentials.pass, salt)
	sql = `SELECT count(id) AS count FROM accounts WHERE user="${credentials.user}";`
	records = await db.query(sql)
	console.log(records[0].count)
	if(records[0].count) throw new Error(`username already exists`)
	sql = `INSERT INTO accounts(user, pass) VALUES("${credentials.user}", "${credentials.pass}")`
	console.log(sql)
	records = await db.query(sql)
	return true
}


