import Image from 'next/image';
import classes from './adventure-detail.module.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function AdventureDetail({ title, image, address, description }) {
    return (
        <section className={classes.detail}>
            <Image
                src={image}
                alt={title}
                width={700}
                height={475}
                className={classes.img}
                sizes="(max-width: 700px) 100vw, 700px"
            />
            <div className={classes.content}>
                <h1>{title}</h1>
                <div className={classes.address}>
                    <FaMapMarkerAlt className={classes.icon} />
                    <address>{address}</address>
                </div>
                <div className={classes.description}>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    );
}
