import { BrowserRouter as Router, Route } from "react-router-dom";
import FooterSection from "./components/FooterSection/FooterSection";
import Header from "./components/Header/Header";
import data from "./data";

function App() {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-200 text-gray-500">
      <Router>
        {/* Header Section */}
        <Header />
        <Route path={data.brand.path} component={data.brand.container} exact />
        {data.navLinks.map((link) => (
          <Route path={link.path} component={link.container} exact />
        ))}
        {/* Footer Section */}
        <FooterSection />
      </Router>
    </div>
  );
}

export default App;
