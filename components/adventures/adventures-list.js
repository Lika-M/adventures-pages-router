import AdventureItem from './adventure-item.js';
import classes from './adventures-list.module.css';

export default function AdventuresList({ adventures }) {
    return (
        <ul className={classes.list}>
            {adventures.map(({ id, image, title, address }) => (
                <AdventureItem
                    key={id}
                    id={id}
                    image={image}
                    title={title}
                    address={address}
                />
            ))}
        </ul>
    );
}