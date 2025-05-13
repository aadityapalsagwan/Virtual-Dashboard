const mongoose = require('mongoose');


const mongoURL = 'mongodb+srv://adipal9857:kd2TEL3PgX6Q3274@dashboard-db-cluster0.5irfhwb.mongodb.net/';
// const mongoURL = 'mongodb://localhost:27017/DashBoard';

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected',() => {
    console.log('Connected to MongoDB');
});

db.on('error', (err)=> {
    console.log('Error connecting to MongoDB:', err);
});

db.on('disconnected',() => {
    console.log('Disconnected from MongoDB');
});

// Export DB to server
module.export = db;