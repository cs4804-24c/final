import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

/** Sign in the current user with Google */
export async function signIn() {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((result) => { resolve(result); }).catch((error) => { console.error(error); reject(error); })
  })
}

/** Return the current user's details */
export async function getCurrentUser(setter) { auth.onAuthStateChanged((user) => { if (user) { setter(user) } else { setter(null) } }); }

/** SignIn button component */
export function SignInButton() {
  return (
    <button onClick={signIn}>SignIn</button>
  )
}