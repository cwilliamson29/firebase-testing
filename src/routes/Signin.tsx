import {auth, googleProvider} from "../config/firebase.ts";
import {signInWithPopup, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

function Signin() {
    const input = "bg-gray-100 text-black border border-1 border-gray-300 rounded-md text-sm font-medium p-1 mb-2"
    const button = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const signIn = async (e: FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result);
                navigate(('/'))
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const signInWithGoogle = async (e: FormEvent) => {
        e.preventDefault()
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log(result)
                navigate(('/'))
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const logOut = async () => {
        await signOut(auth)
    }
    //console.log(auth?.currentUser)
    return (
        <div className="h-screen flex align-middle">
            <div className="flex flex-col p-5 bg-gray-200 rounded-xl w-100 m-auto my-auto">
                <h2 className="text-lg font-bold text-black text-center">Welcome to MyTeam Manager</h2>
                <p className="text-md text-black mb-5 text-center">To get started, please sign in</p>
                <button type="button" className="login-with-google-btn cursor-pointer" onClick={(e) => signInWithGoogle(e)}>Sign In With Google</button>
                <div className="mt-5 mb-5 border-b-2 border-gray-300 text-center">
                    or sign in with email and password...
                </div>
                <form className="flex flex-col" onSubmit={(e) => signIn(e)}>
                    <input className={input} placeholder="Email Address" type="email" onChange={(e) => setEmail(e.target.value)} required/>
                    <input className={input} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
                    <button type="submit" className={button}>Sign In</button>
                </form>

                <button className={button} onClick={logOut}>Sign Out</button>
            </div>
        </div>

    )
}

export default Signin
