import classes from './home-content.module.css';

export default function HomeContent() {
    return (
        <div className={classes["brands-container"]}>
            <h1>The Most Beautiful Places in the World</h1>
            <p>These destinations are the world's best sights to see.</p>
            <div className={classes["brands-carousel"]}>
                <picture className={classes["brand-picture"]}>
                    <source srcSet="https://picsum.photos/200/600?random=1" media="(max-width: 766px)" />
                    <img src="https://picsum.photos/600/600?random=1" alt="Beautiful place 1" />
                </picture>
                <picture className={classes["brand-picture"]}>
                    <source srcSet="https://picsum.photos/200/600?random=2" media="(max-width: 766px)" />
                    <img src="https://picsum.photos/600/600?random=2" alt="Beautiful place 2" />
                </picture>
                <picture className={classes["brand-picture"]}>
                    <source srcSet="https://picsum.photos/200/600?random=3" media="(max-width: 766px)" />
                    <img src="https://picsum.photos/600/600?random=3" alt="Beautiful place 3" />
                </picture>
                <picture className={classes["brand-picture"]}>
                    <source srcSet="https://picsum.photos/200/600?random=4" media="(max-width: 766px)" />
                    <img src="https://picsum.photos/600/600?random=4" alt="Beautiful place 4" />
                </picture>
            </div>
            <div>
                <h3>There are never-ending reasons to travel, but many go to seek those awe-inspiring moments that stop them in their tracks, searching for the sights that will stay with them forever.</h3>
                <p>Join us for a journey to some of the most beautiful places in the world, like the red rocks of the Grand Canyon and the abundantly colorful Great Barrier Reef.</p>
            </div>
        </div>
    );
}
