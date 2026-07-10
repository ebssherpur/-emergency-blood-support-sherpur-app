// Firebase Configuration

const firebaseConfig = {
  apiKey: "AIzaSyCYfd7GzqQhcooQ24ApG-SoSlPdDloKTQ",
  authDomain: "emergency-blood-support-b50bb.firebaseapp.com",
  databaseURL: "https://emergency-blood-support-b50bb-default-rtdb.firebaseio.com",
  projectId: "emergency-blood-support-b50bb",
  storageBucket: "emergency-blood-support-b50bb.firebasestorage.app",
  messagingSenderId: "188376120497",
  appId: "1:188376120497:web:270306dfdcec2bca10f690",
  measurementId: "G-25F632DBH1"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Global Firebase Objects

window.auth = firebase.auth();
window.db = firebase.database();