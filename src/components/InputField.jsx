
export default function InputField({ type = "text", name, required = true, className, placeholder, value, ...props }) {
    return (
        <input
            type={type}
            name={name}
            required={required}
            className={`w-full border border-gray-200 px-3 py-2 rounded-md placeholder:text-gray-400 text-gray-500 ${className}`}
            placeholder={placeholder}
            value={value}
            {...props}
        />
    )
}
