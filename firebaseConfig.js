import {initializeApp} from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
  deleteUser,
  getAuth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore, collection} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCthZSZyOnxZWFxVBFkNQW_WUrX3Ok_BAU",  
  authDomain: "ptcoco-3adf5.firebaseapp.com",  
  projectId: "ptcoco-3adf5",  
  storageBucket: "ptcoco-3adf5.appspot.com",  
  messagingSenderId: "235819843343",  
  appId: "1:235819843343:android:3058a66c049668d387c87a"  
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
//Tạo connection dùng cho các hàm khác
export const usersRef = collection(db, 'user');
//Tạo connection  dùng cho các hàm khác
export const roomRef = collection(db, 'rooms');