import MainNavigation from "./main-navigation.js";

export default function Layout({ children }) {
    return (
        <>
            <MainNavigation />
            <main>{children}</main>
        </>
    );
}