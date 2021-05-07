import firebase from 'firebase/app';
import 'firebase/firestore';

// Required for side-effects
require('firebase/firestore');

const fb = firebase.initializeApp({
	apiKey: 'AIzaSyBpX_AKYedJ2OU52x2jTyxbMc2uN7oWXYg',
	authDomain: 'shop-67.firebaseapp.com',
	projectId: 'shop-67',
});

var db = firebase.firestore();

export { fb, db };
