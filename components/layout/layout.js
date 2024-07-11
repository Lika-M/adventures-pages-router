import MainNavigation from "./main-navigation.js";
import classes from './layout.module.css';

export default function Layout({ children }) {
    return (
        <>
            <MainNavigation />
            <main className={classes.main}>{children}</main>
        </>
    );
}