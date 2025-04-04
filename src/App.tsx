import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./components/Home.tsx";
import Signin from "./routes/Signin.tsx";
import Signup from "./routes/Signup.tsx";

function App() {
    const router = createBrowserRouter([
        {path: "/", element: <Home/>},
        {path: "/signin", element: <Signin/>},
        {path: "/signup", element: <Signup/>},
    ])

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
