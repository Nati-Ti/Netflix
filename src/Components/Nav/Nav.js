import React, { useEffect, useState } from 'react'
import './nav.css'

function Nav() {

    const[show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () =>{
            if(window.scrollY > 100){
                setShow(true);
            }
            else setShow(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png"
                alt="Netflix Logo"/>
            <img
                className="nav__avatar"
                src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
                alt="Avatar logo"/>
        </div>
    )
}

export default Nav