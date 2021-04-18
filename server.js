const  express = require('express')
const connectDB =require('./config/db')
const path = require('path')
const app = express()
var cors = require('cors') 

connectDB();

app.use(cors());

app.use(express.json({ extended: false }))
app.use('/user',require('./routes/user'));
app.use('/auth',require('./routes/auth'));
app.use('/profile',require('./routes/profile'));
app.use('/post',require('./routes/post'));

if (process.env.NODE_ENV === 'production'){

    console.log('running');
    app.use( express.static('client/build')); 

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const port = process.env.PORT || 5000 ;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))