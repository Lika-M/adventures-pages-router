import { useRouter } from 'next/router';
import Image from 'next/image';

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
                    <Image
                        src={image}
                        alt={title}
                        width={700}
                        height={300}
                        sizes="(max-width: 700px) 100vw, 700px"
                        priority={true}
                    />
                </div>
                <div className={classes.description}>
                    <div className={classes.content}>
                        <h3>{title}</h3>
                        <address>{address}</address>
                    </div>
                    <div className={classes.actions}>
                        <button onClick={showDetail}>Show Details</button>
                    </div>
                </div>
            </div>
        </li>
    );
}