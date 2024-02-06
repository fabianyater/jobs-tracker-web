import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string
}

const Input: React.FC<InputProps> = ({ text, ...props }) => {
  return (
    <label className={styles.label}>
      {text}
      <input className={styles.input} {...props} />
    </label>
  );
};

export default Input;
