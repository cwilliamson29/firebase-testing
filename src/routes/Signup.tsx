import {auth} from "../config/firebase.ts";
import {createUserWithEmailAndPassword} from "firebase/auth"
import Validator from "passcode-validator";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup() {
    const input = "bg-gray-100 text-black border border-1 border-gray-300 rounded-md text-sm font-medium p-1 mb-2"
    const button = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const passwordValidator = new Validator()
        .upperCase()
        .lowerCase()
        .digit()
        .length(6, 24)
        .specialChar()
        .build()
    const [err, setErr] = useState(false);
    const [errorMsg, setErrMsg] = useState("");

    const checkPassword = () => {
        const {isValid} = passwordValidator.validate(password);
        if (password === confirmPassword && isValid) {
            setErr(false)
            return true
        } else if (password !== confirmPassword) {
            setErr(true)
            setErrMsg("Passwords must match")
            return false;
        } else if (!isValid) {
            setErr(true);
            setErrMsg("Password not strong enough");
            return false;
        }
    }
    const signUp = async (e: FormEvent) => {
        e.preventDefault();
        setErr(false)
        const checkPass = checkPassword()

        if (checkPass) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    console.log(user)
                    navigate("/")
                })
                .catch((error) => {
                    setErr(true);
                    setErrMsg("User already exists");
                    console.log(error)
                })
        }

    }
    //console.log(auth?.currentUser)
    return (
        <div className="h-screen flex align-middle">
            <div className="flex flex-col p-5 bg-gray-200 rounded-xl w-100 m-auto my-auto">
                <h2 className="text-lg font-bold text-black text-center">Welcome to MyTeam Manager</h2>
                <p className="text-md text-black mb-5 text-center">To get started, please sign up</p>

                {err && <p className="text-red-500 font-bold">{errorMsg}</p>}

                <form onSubmit={(e) => signUp(e)} className="flex flex-col">
                    <input className={input + " mb-3 font-sm"} placeholder="Email Address" type="email" onChange={(e) => setEmail(e.target.value)} required/>
                    <p className="text-md text-black mb-0 text-center">Please choose, and confirm password.</p>
                    <input className={input} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
                    <input className={input} placeholder="Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    <button type="submit" className={button}>Sign In</button>
                </form>


                <div className="password-list mt-2 ml-5 mr-7 bg-red-200 rounded-lg p-3 ">
                    <p>Passwords must contain the following:</p>
                    <ul className="list-disc ml-10">
                        <li>8 - 24 characters long</li>
                        <li>uppercase letter</li>
                        <li>lowercase letter</li>
                        <li>number</li>
                        <li>special character</li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Signup
