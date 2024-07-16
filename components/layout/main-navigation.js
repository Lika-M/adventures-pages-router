import Link from 'next/link';

import classes from './main-navigation.module.css';

export default function MainNavigation() {

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href='/'>
                    Adventures
                </Link>
            </div>
            <nav>
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