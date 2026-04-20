import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "../styles.css";

export default function Layout({ children }) {
  return (
    <div className="wc-root">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
