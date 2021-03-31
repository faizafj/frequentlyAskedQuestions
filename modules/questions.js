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
}

//Saves image to file
function saveImage(data) {
    const photoName = saveFile(data.dataURI, data.username)
    return photoName
}

async function addQuestionDetails (data){
    let sql = `SELECT id FROM accounts WHERE user = "${data.username}"`
    console.log(sql)
    let result = await db.query(sql)
    data.userid = result[0].id
    console.log(data)
}