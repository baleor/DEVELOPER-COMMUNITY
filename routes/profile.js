const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Profile = require('../model/profile');
const user = require('../model/user')
const post = require('../model/post')
const { check , validationResult } = require('express-validator');
const { response } = require('express');

router.get('/me', auth, async (req,res) => {
    
    try {
        const profile = await Profile.findOne({ user : req.user.id }).populate('user',['name','avatar']);

        if(!profile)
        {
            return res.status(400).json({ msg : 'There is no profile for this user'});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.post('/', [
    auth,
    [
        check('status','Status is required').not().isEmpty(),
        check('skills','Skills are required').not().isEmpty()
    ]
], async (req, res) => {
    const error = validationResult(req);

    if(!error.isEmpty())
    {
        return res.status(400).json({ error : error.array() })
    }

    let {
        company,
        website,
        location,
        bio,
        status,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin    
    } = req.body;

    const profilefields = {};
    profilefields.user = req.user.id;
    if(company) profilefields.company = company;
    if(website) profilefields.website = website;
    if(location) profilefields.location = location;
    if(bio) profilefields.bio = bio;
    if(status) profilefields.status = status;
    if(skills){
        skills = skills + ''
        profilefields.skills = skills.split(",").map(skill => skill.trim());
    }

    profilefields.social = {};
    if(youtube) profilefields.social.youtube = youtube;
    if(facebook) profilefields.social.facebook = facebook;
    if(twitter) profilefields.social.twitter = twitter;
    if(instagram) profilefields.social.instagram = instagram;
    if(linkedin) profilefields.social.linkedin = linkedin;

    try {
        let profile = await Profile.findOne({user : req.user.id });
        if(profile){
            //Update
            profile = await Profile.findOneAndUpdate(
                {user : req.user.id},
                { $set : profilefields},
                { new : true}
                ); 

            return res.json(profile);
        }
        profile = new Profile(profilefields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/', async (req,res) => {

    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

router.get('/user/:user_id', async (req,res) => {
    
    try {
        const profile = await Profile.findOne({ user : req.params.user_id }).populate('user',['name','avatar']);

        if(!profile)
        {
            return res.status(400).json({ msg : 'There is no profile for this user'});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg : 'Profile not found '});
        }
        res.status(500).send('Server error');
    }
})

router.delete('/', auth, async (req,res) => {

    try {
        await post.findOneAndRemove({user : req.user.id});
        await Profile.findOneAndRemove({user : req.user.id});
        await user.findOneAndRemove({ _id : req.user.id});
        res.send({msg : 'User Removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/experience',[auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'This is required').not().isEmpty()
]], async (req, res) =>
{
    const error = validationResult(req);

    if(!error.isEmpty())
    {
        res.status(500).json({ error : error.array() });
    }

    const {
        title,
        company,
        location,
        from,
        status,
        description
    } = req.body;
    
    const newExp = {
        title,
        company,
        location,
        from,
        status,
        description
    }

    try {
        
        const profile = await Profile.findOne({ user : req.user.id});

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

})

router.delete('/experience/:exp_id',[auth], async (req, res) => {
     
    try {
        const profile = await Profile.findOne({user : req.user.id});

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.put('/education',[auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
]], async (req, res) =>
{
    const error = validationResult(req);

    if(!error.isEmpty())
    {
        res.status(500).json({ error : error.array() });
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
    
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        
        const profile = await Profile.findOne({ user : req.user.id});

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

})

router.delete('/education/:edu_id',[auth], async (req, res) => {
     
    try {
        const profile = await Profile.findOne({user : req.user.id});

        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})
module.exports = router;