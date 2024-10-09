import Navigation from "@/comps/Nav/Nav.jsx";
import Footer from "@/comps/Footer/Footer.jsx";

export default function Layout({ children }) {
    return (
        <div>
        <Navigation />
        {children}
        <Footer />
        </div>
    );
}