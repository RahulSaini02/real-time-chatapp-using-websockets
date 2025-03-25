interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, type, name, value, onChange, error }) => {
  return (
    <div className="">
      <label className="block text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-600 outline-none"
        placeholder={`${label}`}
      />
      {error && (
        <div className="mt-1 text-red-600 text-sm font-medium bg-red-100 border border-red-400 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};