function FooterBottom() {
  return (
    <div className="py-4 mt-16 md:flex justify-between border-t text-gray-500 border-gray-300 text-sm text-center md:text-left space-y-4 md:space-y-0">
      <div>Copyright &copy; {new Date().getFullYear()}</div>
      <div>
        Made with 💜 by{" "}
        <a
          className="text-purple-400 font-medium"
          href="https://github.com/iamsomraj/"
        >
          {" "}
          Somraj
        </a>
      </div>
    </div>
  );
}

export default FooterBottom;
