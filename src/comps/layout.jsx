import Navigation from "@/comps/Nav/Nav.jsx";
import Footer from "@/comps/Footer/Footer.jsx";
import StandardTheme from "@/contexts/ThemeProvider.jsx";

export default function Layout(Component) {
  return function LayoutWrapper(props) {
    return (
      <StandardTheme>
        <Navigation />
        <Component {...props} />
        <Footer />
      </StandardTheme>
    );
  };
}
