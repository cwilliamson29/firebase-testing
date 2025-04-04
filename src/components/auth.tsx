import {auth, googleProvider} from "../config/firebase.ts";
import {signInWithPopup, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {useState} from "react";

function Auth() {
    const input = "bg-gray-100 text-black border border-1 border-gray-300 rounded-md text-sm font-medium p-1 mb-2"
    const button = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    }
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    }
    const logOut = async () => {
        await signOut(auth)
    }
    console.log(auth?.currentUser)
    return (
        <div className="flex flex-col p-5 bg-gray-200 rounded-xl w-100">
            <h2 className="text-lg font-bold text-black text-center">Welcome to MyTeam Manager</h2>
            <p className="text-md text-black mb-5 text-center">To get started, please sign in</p>
            <button type="button" className="login-with-google-btn" onClick={signInWithGoogle}>Sign In With Google</button>
            <div className="mt-5 mb-5 border-b-2 border-gray-300 text-center">
                or sign in with email and password...
            </div>
            <input className={input} placeholder="Email Address" type="email" onChange={(e) => setEmail(e.target.value)} required/>
            <input className={input} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
            <button type="button" className={button} onClick={signIn}>Sign In</button>
            <button className={button} onClick={logOut}>Sign Out</button>
        </div>
    )
}

export default Auth
