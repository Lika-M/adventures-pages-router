import AdventureItem from './adventure-item.js';
import classes from './adventures-list.module.css';

export default function AdventuresList({ adventures }) {

    return (
        <ul className={classes.list}>
            {adventures.map((meetup) => (
                <AdventureItem
                    key={meetup.id}
                    id={meetup.id}
                    image={meetup.image}
                    title={meetup.title}
                    address={meetup.address}
                />
            ))}
        </ul>
    );
}