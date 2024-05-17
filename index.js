import cors from 'cors';
const express = require('express');
const app = express();
const initRoutes = require('./src/routes');
require('./connect_db');
// require('./auth_firebase');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// import { getDatabase, ref, push, set, onValue } from 'firebase/database';
// import Firebase from './firebase';
const AutoTakenOrder = require('./autoTakeOrder');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const db = getDatabase(Firebase);
// const newData = push(ref(db, 'avatar/driver'));
// set(newData, {
//     id: 4,
//     avatar: '',
// })
//     .then(() => {
//         console.log('res: success');
//     })
//     .catch((err) => {
//         console.log(('err: ', err));
//     });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
AutoTakenOrder();
// const PORT = process.env.PORT || 8888
const listener = app.listen(PORT, () => {
    console.log('server is running on the port ' + listener.address().port);
});
