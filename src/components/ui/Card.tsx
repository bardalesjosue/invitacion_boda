import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dark' | 'light' | 'outline'
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'dark',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-lg p-6 transition duration-300'
  const variants = {
    dark: 'glass-dark',
    light: 'glass-light',
    outline: 'bg-transparent border border-wedding-gold/20',
  }

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}
