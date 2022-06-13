var admin = require("firebase-admin");
require('dotenv').config();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG))
});

const db = getFirestore();
const docRef = db.collection('commands');

exports.commandDoc = docRef.doc('replies');
exports.jokerDoc = docRef.doc('joker');
