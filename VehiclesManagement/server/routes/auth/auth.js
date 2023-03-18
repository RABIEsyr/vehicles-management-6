const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('../../config/config');

router.post('/log-in', (req, res) => {
    username = req.body.username;
    password = req.body.password
    console.log(username, password)
    if (username && password) {
        console.log(username, password)
        if (username == 'yousef' && password == '123') {
            result = {username, password};
            var token = jwt.sign(
                { user: result,  },
                config.secret,
                // {expiresIn: '30s'}
                
            );
            res.json({
                success: true,
                message: 'succefully Logged in',
                token: token
            });        
    }  else {
        res.json({
            success: false,
            message: 'invalid username or password',
        });   
    }
      
    }

});

module.exports = router;