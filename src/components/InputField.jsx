
export default function InputField({ type = "text", name, required = true, className, placeholder, value, ...props }) {
    return (
        <input
            type={type}
            name={name}
            required={required}
            className={`w-full mt-1 border border-gray-200 px-3 py-2 rounded-md placeholder:text-gray-400 text-gray-500 focus:outline-1 focus:outline-blue-400 ${className}`}
            placeholder={placeholder}
            value={value}
            {...props}
        />
    )
}
