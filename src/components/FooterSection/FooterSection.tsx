import { useState } from "react";
import { Link } from "react-router-dom";
import data from "../../data";
import FooterBottom from "../FooterBottom/FooterBottom";
import FooterLink from "../HeaderLink/HeaderLink";

const FooterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="relative container mx-auto px-10 py-10">
      <div className="lg:flex justify-between space-y-12 lg:space-y-0">
        <div className="flex flex-col justify-center">
          <h4 className="mb-4 font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r text-teal-500">
            Get our monthly updates
          </h4>
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing: " + email);
              setEmail("");
            }}
          >
            <input
              type="email"
              name="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="somraj@somraj.com"
              className="w-full p-3 rounded-l outline-none border-2 border-r-0 border-gray-400 focus:border-purple-400 placeholder-gray-400"
            />
            <button
              disabled={email.trim().length === 0}
              className="p-3 bg-purple-400 text-purple-100 rounded-r"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center text-left lg:text-right">
          <Link
            to={data.brand.path}
            className="mb-4 font-bold text-xl lg:text-left text-transparent bg-clip-text bg-gradient-to-r text-teal-500"
          >
            {data.brand.text}
          </Link>
          {data.navLinks.map((link) => (
            <FooterLink
              key={link.path + link.text}
              path={link.path}
              isPrimary={false}
              text={link.text}
            />
          ))}
        </div>
      </div>
      <FooterBottom />
    </div>
  );
};

export default FooterSection;
