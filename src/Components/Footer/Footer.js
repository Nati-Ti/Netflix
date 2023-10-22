import React, { useState } from 'react'
import FooterProp from './FooterProp'
import './footer.css'


let col1 =['Questions? Contact us.', 'FAQ', 'Investor Relations', 'Privacy', 'Speed Test'];

let col2 = ['Help Center', 'Jobs', 'Cookie Preferences', 'Legal Notices'];

let col3 = ['Account', 'Ways to Watch', 'Corporate Information', 'Only on Netflix'];

let col4 = ['Media Center', 'Terms of Use', 'Contact Us'];




function Footer() {

    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'es', name: 'Spanish' }
    ];

    const handleChangeLanguage = (event) => {
        setSelectedLanguage(event.target.value);
    };

    return (
        <footer className='footer'>
            <div className='footer--links'>
                <FooterProp linkName={col1} />
                <FooterProp linkName={col2} />
                <FooterProp linkName={col3} />
                <FooterProp linkName={col4} />    
            </div>
            <div className='select-dropdown'>
                <select value={selectedLanguage} onChange={handleChangeLanguage}>
                    {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                        {language.name}
                    </option>
                    ))}
                </select>               
            </div>           
        </footer>
    )
}

export default Footer