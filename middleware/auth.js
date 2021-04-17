const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {

    const token = req.header('x-auth-token');

    if(!token)
    {
        return res.status(400).json({
            msg : 'No token, Acess denied'
        })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        req.user = decoded.user;
        next()
    } catch (err) {
        res.status(401).json({msg :'Token is not valid'})
    }
}