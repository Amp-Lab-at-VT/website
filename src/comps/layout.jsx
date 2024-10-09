import Navigation from "@/comps/Nav/Nav.jsx";
import Footer from "@/comps/Footer/Footer.jsx";

export default function Layout(Component) {
  return function LayoutWrapper(props) {
    return (
      <div>
        <Navigation />
        <Component {...props} />
        <Footer />
      </div>
    );
  };
}
