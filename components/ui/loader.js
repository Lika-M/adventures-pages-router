import classes from './loader.module.css';

export default function Loader({ isUploading }) {

    return (
        <div className={classes.wrapper}
            style={{ visibility: isUploading ? 'visible' : 'hidden' }}
        >
            <div className={classes.track}>
                <div className={classes.kurt}>
                    <div className={classes.loader}></div>
                </div>
            </div>
        </div>
    );
}