export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-700 bg-gray-800 text-blue-600 shadow-sm focus:ring-blue-500 focus:ring-offset-gray-900 ' +
                className
            }
        />
    );
}