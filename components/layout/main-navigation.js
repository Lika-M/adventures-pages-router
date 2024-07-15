import Link from 'next/link';

import classes from './main-navigation.module.css';

export default function MainNavigation() {

    return (
        <header className={classes.header}>
            <div className={classes.logo}>Adventures</div>
            <nav>
                <ul>
                    <li>
                        <Link href='/'>All Impressive Places</Link>
                    </li>
                    <li>
                        <Link href='/new-adventure'>Add Journey</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}