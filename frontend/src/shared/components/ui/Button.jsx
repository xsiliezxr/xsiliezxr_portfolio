export function Button({ href, onClick, tone = 'primary', children, className = '' }) {
  const tones = {
    primary: 'bg-ember-500 text-ink-950',
    ghost: 'border border-ink-700 text-fog',
    ink: 'bg-ink-950 text-fog',
    line: 'border border-ink-950 text-ink-950',
  }
  const classes = `inline-flex h-11 items-center justify-center rounded-[12px] border border-ink-700 px-5 text-sm font-semibold whitespace-nowrap transition-transform active:scale-[0.98] ${tones[tone]} ${className}`
  if (href) {
    return (
      <a className={classes} href={href} data-ui>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} onClick={onClick} data-ui>
      {children}
    </button>
  )
}
