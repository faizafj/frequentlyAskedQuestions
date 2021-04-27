/* questions.js */

import {db} from './db.js'
import {saveFile} from './util.js'

export async function add(data) {
    console.log (data)
    const image = {
    username: data.username,
    dataURI: data.image
  }
    if (data.image){
       data.photo = await saveImage(image)
    }
   delete data.avatar
   data.questionId = await addQuestionDetails(data)
   console.log(data)
}

//Saves image to file
function saveImage(data) {
    const photoName = saveFile(data.dataURI, data.username)
    return photoName
}

async function addQuestionDetails (data){
    let sql = `SELECT id FROM accounts WHERE user = "${data.user}"`
    let result = await db.query(sql)
    data.userid = result[0].id
    const now = new Date().toISOString()
    data.date = now.slice(0, 19).replace ('T', ' ')
    sql = `INSERT INTO questions (userid, title, summary, description, image, dateCreated, topic, subtopic)\
    VALUES (${data.userid}, "${data.title}", "${data.summary}", "${data.description}", "${data.photo}", \
    "${data.date}", "${data.topic}", "${data.subtopic}")`
    sql =  sql.replaceAll('"undefined"', 'NULL')
    sql = sql.replaceAll('""', 'NULL')
    console.log (sql)
    result =  await db.query(sql)
    return result.lastInsertId
    //insert answers into answers table selects it by the questions id where question = ....{}
}

async function getUserID(username) {
    const sql = `SELECT id FROM accounts WHERE user = "${username}"`
    console.log(sql)
    let result = await db.query(sql)
    const userid = result[0].id
    return userid
}

//gets user id and other needed data
export async function getAll(username) {
    const userid = await getUserID(username)
    const sql = `SELECT title, summary, image, description, dateCreated FROM questions WHERE userid = ${userid}` //retrieve records
    const result = await db.query(sql)
    return result
}

