import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-medium rounded transition duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-wedding-dark text-wedding-cream border border-wedding-gold/20 hover:bg-wedding-dark-gray',
    secondary: 'bg-wedding-cream text-wedding-dark hover:bg-white',
    gold: 'bg-wedding-gold text-wedding-dark hover:bg-wedding-gold-satin',
    outline: 'bg-transparent border border-wedding-gold text-wedding-gold hover:bg-wedding-gold/10',
    danger: 'bg-red-900/30 text-red-200 border border-red-900 hover:bg-red-900/50',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-7 py-3 text-base',
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
