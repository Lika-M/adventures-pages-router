import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

import ActiveLink from '../ui/active-link.js';
import classes from './main-navigation.module.css';

export default function MainNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: session, status } = useSession();

    const isAuth = status === 'authenticated';

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    async function logoutHandler() {
        await signOut();
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <ActiveLink href='/'>
                    <h3>Adventures</h3>
                </ActiveLink>
                <Image
                    src='/logo.png'
                    width={150}
                    height={120}
                    quality={75}
                    priority
                />
            </div>
            <nav className={`${classes.nav} ${mobileMenuOpen ? classes['open-nav'] : classes['close-nav']}`}>
                <div className={classes.menuToggle} onClick={toggleMobileMenu}>
                    <div className={classes.toggleIcon}>
                        {!mobileMenuOpen ? <FaBars /> : <FaTimes />}
                    </div>
                </div>
                <ul>
                    {isAuth &&
                        <li className={classes['new-adventure']}>
                            <ActiveLink href='/new-adventure'>Add Journey</ActiveLink>
                        </li>
                    }
                    <li>
                        <ActiveLink href='/adventures'>All Impressive Places</ActiveLink>
                    </li>
                    {!isAuth
                        ? <li className={classes['auth-link']}>
                            <ActiveLink href='/auth'>Login</ActiveLink>
                        </li>
                        : <li className={classes['auth-link']}>
                            <button onClick={logoutHandler} className='active'>Logout</button>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );
}
