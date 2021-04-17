const mongoose = require('mongoose')
const config = require('config');
const db = config.get('url')

const connectDB = async () => {
    
    try {
        
        await mongoose.connect(db,
            { useNewUrlParser : true,
              useCreateIndex : true,
              useFindAndModify: false});

        console.log('Connected');
    } catch (err) {

        console.log(err.message);

        process.exit(1);
    }
}

module.exports = connectDB;