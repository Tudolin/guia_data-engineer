import netlifyIdentity from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

const AuthWidget = () => {
  const [user, setUser] = useState<netlifyIdentity.User | null>(null);

  useEffect(() => {
    netlifyIdentity.init();
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
    });
    netlifyIdentity.on('logout', () => {
      setUser(null);
    });

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);

  const handleLogin = () => {
    netlifyIdentity.open();
  };

  const handleLogout = () => {
    netlifyIdentity.logout();
  };

  return (
    <div className="auth-widget">
      {user ? (
        <div>
          <p>Bem-vindo, {user.user_metadata.full_name}!</p>
          <button onClick={handleLogout} className="btn btn-logout">Sair</button>
        </div>
      ) : (
        <button onClick={handleLogin} className="btn btn-login">Entrar</button>
      )}
    </div>
  );
};

export default AuthWidget;