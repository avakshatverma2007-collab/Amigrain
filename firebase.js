const firebaseConfig = {
  apiKey: "AIzaSyB2xOpoXvAGl7obwqmTYW8NtLXG5bNRZfw",
  authDomain: "amigrain-b83c6.firebaseapp.com",
  projectId: "amigrain-b83c6",
  storageBucket: "amigrain-b83c6.firebasestorage.app",
  messagingSenderId: "665004060154",
  appId: "1:665004060154:web:1417c78837ea499ce7c843"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Connect Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

console.log("AMIGRAIN Firebase connected!");
