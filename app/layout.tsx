import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Las Aventuras de Nuestra Familia — cuentos animados para niños',
  description: 'Serie animada infantil en español: Max, Luna, Lio y Tini viven pequeñas aventuras llenas de valores. Nuevos capítulos cada semana.',
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
