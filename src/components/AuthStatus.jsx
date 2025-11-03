import { LogIn, UserPlus2 } from "lucide-react";
import { LogOut } from "lucide-react";
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const AuthStatus = ({ user = true }) => {
    const [login, setLogin] = useState(true)

    return user ? (<button
        className="bg-gray-700 hover:bg-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
        onClick={() => setLogin(!login)}
    >
        <LogOut size={18} />
        <span className="hidden sm:inline ml-2">Logout</span>
    </button>) : <>
    <>
        <Link to={"/signup"} className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out' onClick={()=>setLogin(!login)}>
        <UserPlus2 className="mr-2" size={18} />
        Sign Up 
        </Link>
        <Link to={"/login"} className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'>
        <LogIn  size={18} className="mr-2"/>
        Log In
        </Link>
    </>
    </>
}



export default AuthStatus
