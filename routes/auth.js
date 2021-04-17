const express = require('express');
const auth = require('../middleware/auth');
const user = require('../model/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const { check , validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

router.get('/', auth, async (req,res) => {
    try {
        const User = await user.findById(req.user.id).select('-password');
        res.json({User});
    } catch (error) {
        console.error(err.message);
        res.send(500).send('Server error');
    }
})

router.post('/',[
    check('email','Invalid Email').isEmail(), 
    check('password','Incorrect Password').isLength({min:6}),
], async (req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty())
    {
        return res.status(400).json({ error : error.array() })
    }
    
    const {email, password} = req.body;

    try {
        let User = await user.findOne({email});

        if(!User)
        {
            // console.log('Invalid Credentials mail');
            return res.status(400).json({ error : [{ msg: 'Invalid Credentials'}] });
        }
        
        const isMatch = await bcrypt.compare(password,User.password);

        if(!isMatch)
        {
            // console.log('Invalid Credentials pass');
            return res.status(400).json({ error : [{ msg: 'Invalid Credentials'}] });
        }

        const payload = {
            user: {
                id: User.id
            }
        }

        jwt.sign(payload,config.get('jwtsecret'),{expiresIn:360000},
            (err, token) => {
                if(err) throw err;
                res.json({token});
            }
        );


    } catch (err) {
        return res.status(500).send(err.message)
    }

})

module.exports = router;