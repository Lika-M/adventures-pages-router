import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import classes from './main-navigation.module.css';

export default function MainNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    console.log(status);  // loading | authenticated | unauthenticated

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
                <Link href='/'>
                    Adventures
                </Link>
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
                            <Link href='/new-adventure'>Add Journey</Link>
                        </li>
                    }
                    <li>
                        <Link href='/adventures'>All Impressive Places</Link>
                    </li>
                    {!isAuth 
                        ? <li className={classes['auth-link']}>
                            <Link href='/auth'>Login</Link>
                        </li>
                        : <li className={classes['auth-link']}>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );
}
