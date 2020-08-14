import firebase from 'firebase/app';
import 'firebase/database';
import DB_CONFIG from './config'


const db = firebase.initializeApp(DB_CONFIG).database();

export default db;
