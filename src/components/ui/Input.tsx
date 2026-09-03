import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-sans font-medium text-wedding-cream/80 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 rounded bg-wedding-dark-gray border border-wedding-gold/20 text-wedding-cream placeholder:text-wedding-cream/30 focus:outline-none focus:border-wedding-gold transition duration-200 ${className}`}
          {...props}
        />
        {error && <span className="block text-xs text-red-400 mt-1 font-sans">{error}</span>}
      </div>
    )
  },
)

Input.displayName = 'Input'
