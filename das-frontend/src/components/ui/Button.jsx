/**
 * Button - botón con variantes consistentes.
 * variant: primary | secondary | ghost | link
 */
const Button = ({
  variant = 'primary',
  icon,
  iconRight,
  children,
  className = '',
  full = false,
  ...rest
}) => {
  const classes = ['btn', `btn-${variant}`, full ? 'btn-full' : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <button className={classes} {...rest}>
      {icon && <i className={`ti ${icon}`} />}
      {children}
      {iconRight && <i className={`ti ${iconRight}`} />}
    </button>
  );
};

export default Button;
