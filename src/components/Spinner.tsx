export default function Spinner() {
    return (
        <div className='relative w-16 h-16'>
            <div className='absolute inset-0 rounded-full border-4 border-solid border-t-transparent border-l-transparent border-teal-600 animate-spin'></div>
            <div className='absolute inset-0 rounded-full border-4 border-solid border-b-transparent border-r-transparent border-teal-400 animate-[spin_1.5s_linear_infinite_reverse]'></div>
        </div>
    );
}
