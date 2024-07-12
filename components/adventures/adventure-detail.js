import classes from './adventure-detail.module.css';

export default function AdventureDetail({ title, image, address, description }) {

    return (
        <section className={classes.detail}>
            <img src={image} alt="title" />
            <div className={classes.content}>
            <h1>{title}</h1>
            <address>{address}</address>
            <p>{description}</p>
            </div>

        </section>
    );
}