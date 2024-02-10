interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

const Input: React.FC<InputProps> = ({ text, ...props }) => {
  return (
    <label>
      {text}
      <input {...props} />
    </label>
  );
};

export default Input;
