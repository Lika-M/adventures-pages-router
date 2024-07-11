import classes from './adventure-item.module.css';

export default function AdventureItem({title, image, address}) {
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
                    <button>Show Details</button>
                </div>
            </div>
        </li>
    );
}