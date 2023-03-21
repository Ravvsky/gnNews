const Button = (props: {
  type: "button" | "submit" | "reset";
  className?: string;
  children: string;
  onClick?: () => void;
}) => {
  const { type, className, children, onClick } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} bg-gray-500 p-[1rem] px-[2rem] rounded-[1rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-medium text-neutral-50 hover:bg-gray-600 transition-all duration-200 ease-in-out`}
    >
      {children}
    </button>
  );
};

export default Button;
