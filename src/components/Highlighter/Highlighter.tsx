const Highlighter: React.FC = ({ children }) => {
  /**
   * basic reusable text highlighter component
   */
  return (
    <span className="italic text-green-500 text-md font-bold tracking-wide">
      {children}
    </span>
  );
};

export default Highlighter;
