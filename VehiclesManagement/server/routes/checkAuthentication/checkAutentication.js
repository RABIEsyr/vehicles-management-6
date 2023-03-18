const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const config = require('../../config/config');

router.post('/', async function(req, res) {
    var isAuth;
    try {
        const token = req.body.token;
        console.log('token0', token);
        if (!token) {
            res.json({
                success: false,
                message: 'send a token please...'
            })
        } else {
          isAuth = isAuthenticated(token);
          if (isAuth) {
           console.log('valid token');
            res.json({
                success: true,
                message: 'authenticated done true'
            })
          } else {
            res.json({
                success: false,
                message: 'authenticated done false'
            })
          }
        }
    } catch (error) {
        res.json({
            success: false,
            message: 'internal error 10001'
        })
    }
})


function isAuthenticated(token) {
    var status;
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            status = false;
        } else {
            status = true;
        }
    });
    return status;
}

module.exports = router;