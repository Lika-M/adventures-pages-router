import { useRouter } from 'next/router';

import classes from './adventure-item.module.css';

export default function AdventureItem({ id, title, image, address }) {
    const router = useRouter();

    function showDetail() {
        router.push(`adventures/${id}`);
    }

    return (
        <li className={classes.item}>
            <div className={classes.card}>
                <div className={classes.image}>
                    <img src={image} alt={title} />
                </div>
                <div className={classes.content}>
                    <h3>{title}</h3>
                    <address>{address}</address>
                </div>
                <div className={classes.actions}>
                    <button onClick={showDetail}>Show Details</button>
                </div>
            </div>
        </li>
    );
}