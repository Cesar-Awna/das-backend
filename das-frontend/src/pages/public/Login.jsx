import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../services/Auth.js';
import { useToast, Button } from '../../components/ui/index.js';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState('d.caceres@dasconcepcion.cl');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Auth.login({ mail, password });
      if (response?.success) {
        toast.success(response.message || 'Inicio de sesión exitoso');
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      } else {
        toast.warn(response?.message || 'No se pudo iniciar sesión');
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || 'Error al iniciar sesión';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo institucional */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink-950 text-paper relative overflow-hidden">
        <div className="absolute inset-0 grain-bg opacity-30" />
        <svg
          className="absolute -top-20 -right-20 opacity-[0.04]"
          width="600"
          height="600"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="95" stroke="white" strokeWidth="0.3" fill="none" />
          <circle cx="100" cy="100" r="70" stroke="white" strokeWidth="0.3" fill="none" />
          <circle cx="100" cy="100" r="45" stroke="white" strokeWidth="0.3" fill="none" />
          <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="0.3" fill="none" />
        </svg>

        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 border border-paper/30 flex items-center justify-center">
                <span className="font-display text-xl">D</span>
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase opacity-70">
                Dirección de Salud Municipal
              </div>
            </div>
            <div className="text-[11px] tracking-[0.2em] uppercase opacity-50 ml-[52px]">
              Concepción · Chile
            </div>
          </div>

          <div className="max-w-md">
            <div className="text-[11px] tracking-[0.3em] uppercase opacity-60 mb-6">
              Sistema integrado
            </div>
            <h1 className="font-display text-5xl leading-[1.1] mb-8">
              Gestión documental
              <br />
              de <em className="italic-accent">calidad</em>
            </h1>
            <p className="text-paper/70 text-[15px] leading-relaxed max-w-sm">
              Plataforma para la acreditación de prestadores, autorización sanitaria, control
              documental y gestión de eventos adversos.
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div className="text-[11px] tracking-wider opacity-50">
              Licitación 2421-16-LE26
              <br />
              Versión 1.0
            </div>
            <div className="text-[11px] tracking-wider opacity-50 text-right">
              Manual de Acreditación
              <br />
              Superintendencia de Salud
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-sm">
          <div className="mb-12">
            <div className="overline mb-3">Acceso autorizado</div>
            <h2 className="font-display text-4xl text-ink-950 leading-tight">Bienvenido</h2>
            <p className="text-stone-600 mt-3 text-[15px]">
              Ingrese sus credenciales para continuar.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            <div>
              <label className="input-label">Correo institucional</label>
              <input
                type="email"
                className="input-line"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="input-label">Contraseña</label>
              <input
                type="password"
                className="input-line"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-stone-600 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 accent-ink-950" /> Mantener sesión
              </label>
              <a href="#" className="text-ink-800 underline underline-offset-4 decoration-stone-300">
                ¿Olvidó su contraseña?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              full
              disabled={loading}
              className="uppercase tracking-wider"
              style={{ padding: '14px 32px' }}
            >
              {loading ? 'Ingresando…' : 'Iniciar sesión →'}
            </Button>
          </form>

          <div className="mt-16 pt-8 border-t border-paper-100 text-[11px] tracking-wider uppercase text-stone-600 flex justify-between">
            <span>© 2026 DAS Concepción</span>
            <span>Soporte técnico</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
