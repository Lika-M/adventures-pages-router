import Link from 'next/link';
import { useState } from 'react';

import { FaBars, FaTimes } from 'react-icons/fa';
import classes from './main-navigation.module.css';

export default function MainNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href='/'>
                    Adventures
                </Link>
            </div>
            <nav className={mobileMenuOpen ? classes['open-nav'] : classes['close-nav']}>
                <div className={classes.menuToggle} onClick={toggleMobileMenu}>
                    <div className={classes.toggleIcon}>
                        {!mobileMenuOpen ? <FaBars/> : <FaTimes/> }
                    </div>
                </div>
                <ul>
                    <li>
                        <Link href='/adventures'>All Impressive Places</Link>
                    </li>
                    <li>
                        <Link href='/new-adventure'>Add Journey</Link>
                    </li>
                    <li>
                        <Link href='/auth'>Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
