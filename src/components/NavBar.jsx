import React, {useState} from 'react'
import {Link, NavLink} from "react-router-dom"
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai'
import { FaHome } from "react-icons/fa";

const NavBar = () =>  {
    const [togglerNav, setTogglerNav] = useState(false);

    const navLinks = [
        {text: "Live results", to: "/"},
        {text: "League table", to: "/leagues-table"},
        {text: "League table-live", to: "/leagues-table-live"},
        {text: "Login", to: "/login"},

    ]

    const clickHandler = () => {
        setTogglerNav(!togglerNav);
    };

    return (
        <nav className='w-full h-auto md:h-24 p-2 bg-gray-600 flex justify-between md:items-center'>
            <Link to='/'>
                <FaHome className='ml-4 text-3xl text-amber-300' />
            </Link>
            <div
                className={
                    togglerNav ? 'flex flex-col gap-4 md:inline' : 'hidden md:inline'
                }
            >
                {
                    navLinks.map((navLink) => (
                        <NavLink key={navLink.text} className='nav-link'
                                 onClick={clickHandler} to={navLink.to}>
                            {navLink.text}
                        </NavLink>
                    ))
                }
            </div>
            <button
                className=' inline md:hidden self-start nav-link'
                onClick={clickHandler}
            >
                {togglerNav ? <AiOutlineClose /> : <FaBars />}
            </button>
        </nav>
    );
}

export default NavBar;