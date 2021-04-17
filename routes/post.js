const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const user = require('../model/user')
const post = require('../model/post')
const Profile = require('../model/profile')
const { check , validationResult } = require('express-validator/check');

router.get('/', auth, async (req, res) => {
    try {
        
        const posts = await post.find().sort({ date: -1});
        
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        
        const posts = await post.findById(req.params.id);
        
        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post not found'})
        }
        res.status(500).send('Server error');
    }
})

router.post('/', [auth ,[
    check('text','Text is required').not().isEmpty()
]], async (req,res) => {

    const error = await validationResult(req);

    if(!error.isEmpty())
    {
        return res.status(400).json({ error : error.array()})
    }

    const User = await user.findById(req.user.id ).select('-password');

    try {
        const newPost = new post({
            text: req.body.text,
            name: User.name,
            avatar: User.avatar,
            user:req.user.id
        })

        const Post = await newPost.save();

        res.json(Post);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
})

router.delete('/:id',auth, async (req, res) => {
    
    try {
        const posts = await post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }
        
        if(posts.user.toString() !== req.user.id){
            return res.status(401).json({ msg : 'User not authorized'})
        }

        await posts.remove();

        res.json({msg : 'Post removed'});

    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post not found'})    
        }
        res.status(500).send('Server error');
    }
})

router.put('/like/:id', auth, async (req,res) => {
    try {
        const posts = await post.findById(req.params.id);
        
        if(posts.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ error : [{ msg : "Post already liked"}] })
        }

        posts.likes.unshift({user : req.user.id});

        await posts.save();

        res.json(posts.likes);
4
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.put('/unlike/:id', auth, async (req,res) => {
    try {
        const posts = await post.findById(req.params.id);
        
        if(posts.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ error : [{ msg: "Post has not yet been liked"}] })
        }

        const removeIndex = posts.likes.map(like => like.user.toString()).indexOf(req.user.id);

        posts.likes.splice(removeIndex, 1);
        await posts.save();

        res.json(posts.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.post('/comment/:id', [auth ,[
    check('text','Text is required').not().isEmpty()
]], async (req,res) => {

    const error = await validationResult(req);

    if(!error.isEmpty())
    {
        return res.status(400).json({ error : error.array()})
    }

    try {

        const User = await user.findById(req.user.id ).select('-password');
        const posts = await post.findById(req.params.id);


        const newComment = {
            text: req.body.text,
            name: User.name,
            avatar: User.avatar,
            user:req.user.id
        }

        posts.comments.unshift(newComment);

        await posts.save();
        res.json(posts);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
})

router.delete('/comment/:id/:comment_id', auth, async (req,res) => {

    try {
        const posts = await post.findById(req.params.id);

        const comment = posts.comments.find(comments => comments.id === req.params.comment_id);

        if(!comment)
        {
            return res.status(404).json({ msg :'Coment does not exist'});
        }

        if(comment.user.toString() !== req.user.id)
        {
            return res.status(401).json({ msg :'User not authorised'});
        }

        const removeIndex = posts.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        posts.comments.splice(removeIndex, 1);
        await posts.save();
        res.json(posts.comments);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
})

module.exports = router;