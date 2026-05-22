import { useCallback, useEffect, useState } from 'react';

function normalizePath(pathname) {
  if (!pathname || pathname === '/' || pathname === '') return '/';
  const cleaned = pathname.replace(/^#/, '').replace(/\/+$/, '') || '/';
  const withSlash = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  return withSlash === '' ? '/' : withSlash;
}

function readPath() {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash) {
    return normalizePath(hash);
  }

  const pathname = window.location.pathname;
  if (pathname === '/menu' || pathname.endsWith('/menu')) {
    return '/menu';
  }

  return normalizePath(pathname);
}

export function usePathname() {
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const sync = () => setPath(readPath());

    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);

    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const navigate = useCallback((nextPath) => {
    const target = normalizePath(nextPath);

    if (readPath() === target) {
      setPath(target);
      return;
    }

    if (target === '/') {
      window.location.hash = '';
    } else {
      window.location.hash = `#${target}`;
    }

    setPath(target);
    window.scrollTo({ top: 0, left: 0 });
    window.lenis?.scrollTo(0, { immediate: true });
  }, []);

  return [path, navigate];
}
