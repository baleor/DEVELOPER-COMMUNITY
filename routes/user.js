const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const { check , validationResult } = require('express-validator');
const user = require('../model/user');

router.post('/',[
    check('name','Name is Required').not().isEmpty(),
    check('email','Invalid Email').isEmail(),
    check('password','Please enter minimum 6 characters in Password').isLength({min:6}),
], async (req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(400).json({ error : error.array() });
    }
    
    const {name, email, password} = req.body;

    try {

        let User = await user.findOne({email});

        if(User)
        {
            return res.status(400).json({ error : [{ msg: 'User already exists'}] });
        }

        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })

        User = new user ({
            name,
            email,
            password,
            avatar
        });
        
        const salt = await bcrypt.genSalt(10);

        User.password = await bcrypt.hash(password, salt);
        
        await User.save();

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