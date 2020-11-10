const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const settings = require('./settings');

const battleRouter = require('./routes/battleRoutes');

const app = express();
app.use(express.json());
app.use(cors());

const { username, password, dbname } = settings['db'];
const port = settings['port'];
const connectionMethod = settings['connectionMethod'];
let uri = '';

// change the uri dependending on the connectionMethod value
if (connectionMethod == 'local') {
    uri = `mongodb://localhost:27017/${dbname}`;
}
else {
    uri = `mongodb+srv://${username}:${password}@cluster0.3qenh.mongodb.net/${dbname}?retryWrites=true&w=majority`;
}
console.log(uri)
mongoose.connect(
    uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

// connect to mongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongodb')
    // we're connected!
});
// add our router to the app
app.use(battleRouter);
// listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})