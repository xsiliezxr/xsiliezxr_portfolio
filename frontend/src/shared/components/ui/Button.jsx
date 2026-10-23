export function Button({ href, onClick, tone = 'primary', children, className = '', ...rest }) {
  const tones = {
    primary: 'bg-ember-500 text-ink-950 hover:bg-ember-300',
    ghost: 'border border-ink-700 text-fog hover:border-ember-500 hover:text-ember-300',
    ink: 'bg-ink-950 text-fog hover:bg-ink-800',
    line: 'border border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-fog',
  }
  const classes = `inline-flex h-11 items-center justify-center rounded-none border border-ink-700 px-5 text-sm font-semibold whitespace-nowrap transition-[transform,color,background-color,border-color] duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ${tones[tone]} ${className}`
  if (href) {
    return (
      <a className={classes} href={href} data-ui {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} onClick={onClick} data-ui {...rest}>
      {children}
    </button>
  )
}
