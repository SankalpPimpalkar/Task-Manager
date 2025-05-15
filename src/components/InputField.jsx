
export default function InputField(
    {
        id,
        label,
        type = 'text',
        placeholder,
        required = true,
        icon: Icon,
        value,
        onChange,
        ...props
    }) {
    return (
        <div className='space-y-1'>
            <label htmlFor={id} className='text-xs text-gray-600 block'>
                {label}
            </label>
            <div className='flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1.5 text-sm'>
                {Icon && <Icon size={14} className='text-gray-400' />}
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className='w-full outline-none bg-transparent text-sm'
                    {...props}
                />
            </div>
        </div>
    )
}
