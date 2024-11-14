
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { loginSuccess, logoutSuccess } from '@/store/slices/user.slice';


export const loginUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(loginSuccess(userCredential.user));
  } catch (error) {
    console.error("Login error: ", error);
    throw error;
  }
};


export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Logout error: ", error);
  }
};
