import { useRouter } from 'next/router';
import Link from 'next/link';

import classes from './active-link.module.css'

export default function ActiveLink({ href, children }) {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href} className={isActive ? classes.active : ''}>
            {children}
        </Link>
    );
};

