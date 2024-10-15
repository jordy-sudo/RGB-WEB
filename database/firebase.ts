import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

// Configuración de Firebase (es opcional en React Native, pero se puede mantener si es necesario)
const firebaseConfig = {
  apiKey: "AIzaSyA57uZFxqgfxT_8rdTDbhBtPrPYKiEh58s",
  authDomain: "rgb-movil.firebaseapp.com",
  databaseURL: "https://rgb-movil-default-rtdb.firebaseio.com",
  projectId: "rgb-movil",
  storageBucket: "rgb-movil.appspot.com",
  messagingSenderId: "735565078518",
  appId: "1:735565078518:web:638d4469982611c736f1d7",
  measurementId: "G-TY2EBQ9JRM"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); // Inicializa solo si no hay una app inicializada
}

// Crea una referencia a la base de datos
const databaseRef = database().ref();

export default {
  databaseRef
};
