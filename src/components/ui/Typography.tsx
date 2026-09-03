import React from 'react'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  as,
  className = '',
  ...props
}) => {
  const Component =
    as || (variant === 'h1' ? 'h1' : variant === 'h2' ? 'h2' : variant === 'h3' ? 'h3' : 'p')

  const styles = {
    h1: 'font-serif text-4xl md:text-6xl text-wedding-gold tracking-wide leading-tight',
    h2: 'font-serif text-3xl md:text-4xl text-wedding-gold tracking-wide leading-snug',
    h3: 'font-serif text-xl md:text-2xl text-wedding-gold-satin tracking-wide',
    body: 'font-sans text-sm md:text-base text-wedding-cream/80 leading-relaxed',
    caption: 'font-sans text-xs text-wedding-cream/50',
  }

  return (
    <Component className={`${styles[variant]} ${className}`} {...props}>
      {children}
    </Component>
  )
}
