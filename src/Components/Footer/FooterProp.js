import React from 'react'
import './footer.css'
// import { Link } from 'react-router-dom'

function FooterProp({linkName}) {
    return (
        <ul className='footer--links__wrapper'>
            {linkName.map((link)=>{
                return (
                <li className='footer--link' key={link}><a href={`/${link}`}>{link}</a></li>
            )})}
        </ul>
    )
}

export default FooterProp