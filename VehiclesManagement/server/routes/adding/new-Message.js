const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const db = require('../../db/db');
const checkAuth = require('../../middleware/checkAuth');

const isExists =  async () => await fs.promises.access("uploads").then(() => true).catch(() => false);


var DIR = "uploads";


router.post('/new', checkAuth, async (req, res, next) => {
    const serialNumber = req.body.serialNumber
    const sender = req.body.senderId;
    const messageNumber = req.body.messageNumber;
    const conclusion = req.body.conclusion;
    const date = req.body.date;
    const result = req.body.result;

    // console.log('new incoming', sender, messageNumber, serialNumber, date)
    console.log('new incoming sender:', sender,)
    const year = new Date(date).getFullYear();
    console.log('new incoming', sender, messageNumber, serialNumber, date, 'year', year)
    try {
        if (messageNumber && sender && conclusion && serialNumber, date && result) {
            const newIncomingMessage = new db.IncomingSchema();
            newIncomingMessage.serialNumber = serialNumber;
            newIncomingMessage.year = year;
            newIncomingMessage.date = date;
            newIncomingMessage.messageNumber = messageNumber;
            newIncomingMessage.sender = sender;
            newIncomingMessage.conclusion = conclusion;
            newIncomingMessage.result = result;

            if (await isExists()) {
              var resultArr = await isMessageExists({messageSerialNumber: serialNumber, year: year});
                if (resultArr.length < 1) {
                    newIncomingMessage.save().then((doc) => {
                        const docId = doc._id;
                        fs.mkdirSync(`uploads/${docId}`, { recursive: true });
                        const length = req.body.images.length
                        console.log('req.body.payload', req.body.images.length);
                        if (length > 0) {
                            fs.mkdirSync(`uploads/${docId}/${sender}`, { recursive: true });
                            DIR = `uploads/${docId}/${sender}`
                            for (let index = 0; index < length; index++) {
                                fs.writeFileSync(path.join(DIR, `${index}.jpg`), new Buffer.from(req.body.images[index].replace(/^data:image\/\w+;base64,/, ""), 'base64'));
                            }
                        }
                        DIR = 'uploads'
                    }).catch((err) => {
                        console.log('eee2', err);
                        res.json({
                            success: false,
                            message: 'internal error 001 with mongodb insertion',
                        })
                    })
                } else {
                    console.log('5555555', 'doc exists')
                    res.json({
                        success: false,
                        message: 'internal error 001',
                        reason: 'serial number exists'
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: 'upload folder not exists',
                })
            }
               

        } 
    } catch (error) {
        res.json({
            success: false,
            message: 'internal error 001'
        })
    }

});


module.exports = router;


async function isMessageExists({year, messageSerialNumber}) {
   var status = await db.IncomingSchema.find({year: year, serialNumber: messageSerialNumber})
   console.log('sta2tus', status)
   return status;

}