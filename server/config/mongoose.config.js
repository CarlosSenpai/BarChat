const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( () => {
        console.log(`You're connected to the database callsed ${process.env.DB_NAME}`)
    })
    .catch( (err) => {
        console.log(`You had a problem connecting to the ${process.env.DB_NAME}, here is your error: `, err)
    });