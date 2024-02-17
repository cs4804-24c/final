import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

/** Style for a container that centers buttons */
const containerStyle = { display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }

/** Sign in the current user with Google */
export async function signIn() {
    return new Promise((resolve, reject) => {
        signInWithPopup(auth, new GoogleAuthProvider()).then((result) => { resolve(result); }).catch((error) => { console.error(error); })
    })
}

/** 
 * Return the current user's details
 * @param {Function} setter - React setState function 
 * */
export async function getCurrentUser(setter) { auth.onAuthStateChanged((user) => { if (user) { setter(user) } else { setter(null) } }); }

/** SignIn button component */
export function SignInButton() {
    return (
        <div style={containerStyle}>
            <button onClick={signIn} className="button is-family-code">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" style={{ width: 30, aspectRatio: "1/1", marginRight: 10, userSelect: "none" }} />
                Sign In With Google
            </button>
        </div>
    )
}

export function SignOutButton() {
    return (
        <div style={containerStyle}>
            <button onClick={() => { auth.signOut() }} className="button is-family-code">
                Sign Out
            </button>
        </div>
    )
}