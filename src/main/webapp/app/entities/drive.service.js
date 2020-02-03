import * as fs from "fs";

const { google } = require('googleapis');
const scopes = ['https://www.googleapis.com/auth/drive'];
const credentials = require('./credential.json');

const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);
const drive = google.drive({ version: "v3", auth });

drive.files.list({}, (err, res) => {
  if (err) throw err;
  const files = res.data.files;
  if (files.length) {
    files.map((file) => {
      console.log(file);
    });
  } else {
    console.log('No files found');
  }
});
//
import {google} from 'googleapis'
//const { google } = require('googleapis');
const scopes = ['https://www.googleapis.com/auth/drive'];
const credentials = require('./credential.json');

const auth = new google.auth.JWT(
  credentials.client_email, undefined,
  credentials.private_key, scopes
);
const drive = google.drive({ version: "v3", auth });

let fileId = '1_zXXIHbRxRvoSl4OOFSEpj-hjl3BNWAcq-jSUNX4Uzg';
let dest = fs.createWriteStream('/tmp/test.docx');

drive.files.export({
  fileId: fileId,
  mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}, (err,res)=>{
  if (err){
    return console.log('The API returned an error: ' + err);
  }
  else
  {
    console.log(res);
  }})
