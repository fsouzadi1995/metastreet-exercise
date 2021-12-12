import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClass =
  'px-6 py-4 rounded-lg shadow-md border-cyan-800 border-2 text-slate-300 transition-all outline-none outline-offset-8 hover:bg-cyan-800 focus:outline-cyan-500';

function Button({ children, className, ...props }: ButtonProps): JSX.Element {
  return (
    <button type='button' {...props} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
