interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, type, name, value, onChange, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} value={value} onChange={onChange} />
      {error && <div>{error}</div>}
    </div>
  );
};