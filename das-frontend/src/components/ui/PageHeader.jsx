/**
 * PageHeader - encabezado sticky con overline, título y acciones.
 */
const PageHeader = ({ overline, title, breadcrumb, actions }) => {
  return (
    <header className="bg-white border-b border-paper-100 px-10 py-5 flex items-center justify-between sticky top-0 z-10">
      <div>
        {breadcrumb && <div className="overline mb-1">{breadcrumb}</div>}
        {overline && !breadcrumb && <div className="overline">{overline}</div>}
        <h1 className="font-display text-2xl text-ink-950">{title}</h1>
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
};

export default PageHeader;
