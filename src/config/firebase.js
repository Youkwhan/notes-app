// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAbntlfYMW1R26uYhpeZ7guZmvj_JOp_v4",
	authDomain: "notes-app-35c50.firebaseapp.com",
	projectId: "notes-app-35c50",
	storageBucket: "notes-app-35c50.appspot.com",
	messagingSenderId: "21567163801",
	appId: "1:21567163801:web:f93b486e09de0ba4d3d708",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const notesCollection = collection(db, "notes");
