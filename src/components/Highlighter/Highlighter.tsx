const Highlighter: React.FC = ({ children }) => {
  return (
    <span className="italic text-green-500 text-md font-bold tracking-wide">
      {children}
    </span>
  );
};

export default Highlighter;
