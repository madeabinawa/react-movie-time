const ActionButton = ({ text, outerClassName, innerClassName, onClick }) => {
  return (
    <button className={`w-20 h-8 bg-primary-500 rounded-md hover:bg-primary-600 duration-150 ${outerClassName}`}
      onClick={onClick}
    >
      <div className={`text-xs text-white text-center ${innerClassName}`}>{text}</div>
    </button>
  );
};

export default ActionButton;
