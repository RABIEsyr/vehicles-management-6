const express = require('express');
const router = express.Router();

const db = require('../../db/db');
const checkAuth = require('../../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
    try {
        db.SendersSchema.find()
            .then((docs) => {
                res.json({
                    success: true,
                    senders: docs
                })
            })
            .catch((err) => {
                res.json({
                    success: false
                })
            })
    } catch (error) {
        res.json({
            success: false
        })
    }
});

module.exports = router;