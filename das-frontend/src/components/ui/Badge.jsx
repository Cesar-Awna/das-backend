/**
 * Badge - etiqueta uppercase con variantes de color semántico.
 * Variantes: default | ok | warn | danger | ink | accent
 */
const Badge = ({ variant = 'default', children, className = '' }) => {
  const variantClass = variant === 'default' ? '' : `badge-${variant}`;
  return <span className={`badge ${variantClass} ${className}`.trim()}>{children}</span>;
};

export default Badge;
