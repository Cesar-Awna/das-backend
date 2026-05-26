/**
 * Card - contenedor blanco con borde, base de muchas secciones.
 */
const Card = ({ padded = true, className = '', children, ...rest }) => {
  const classes = ['card', padded ? 'card-padded' : '', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Card;
