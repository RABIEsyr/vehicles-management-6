const express = require('express');
const router = express.Router();

const db = require('../../db/db');
const checkAuth = require('../../middleware/checkAuth');

router.post('/',checkAuth, (req, res) => {
    try {
        const name = req.body.name;
        if (name) {
            const newSender = new db.SendersSchema();
            newSender.name = name;
            newSender.save()
                .then((doc) => {
                    res.json({
                       success: true 
                    });
                })
                .catch((err) => {
                    res.json({
                        success: false 
                     });
                })
        }
    } catch (error) {
        res.json({
            success: false 
         });
    }

});

module.exports = router;