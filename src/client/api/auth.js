import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export async function signIn() {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((result) => { resolve(result); }).catch((error) => { console.error(error); reject(error); })
  })
}

export async function getCurrentUser(setter) { auth.onAuthStateChanged((user) => { if (user) { setter(user) } else { setter(null) } }); }

export function SignInButton() {
  return (
    <button onClick={signIn}>SignIn</button>
  )
}