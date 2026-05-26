import Sidebar from './Sidebar.jsx';

/**
 * AppLayout - layout único para todas las páginas privadas.
 * El sidebar es idéntico siempre; el contenido cambia.
 */
const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <main className="flex-1 overflow-y-auto fade-in">{children}</main>
    </div>
  );
};

export default AppLayout;
