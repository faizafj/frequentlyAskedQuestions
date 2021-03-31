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
    console.log(data)
}

//Saves image to file
async function saveImage(data) {
    console.log('saveImage')
    console.log(data)
    const photoName = saveFile(data.dataURI, data.username)
    return photoName
}
