'use client';

import { useState } from 'react';

export default function CopyBox({ label, text }: { label: string; text: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="box">
      <h4>
        {label}
        <button
          className="copy"
          onClick={() => {
            navigator.clipboard.writeText(text).then(() => {
              setDone(true);
              setTimeout(() => setDone(false), 1500);
            });
          }}
        >
          {done ? '¡Copiado!' : 'Copiar'}
        </button>
      </h4>
      <pre>{text}</pre>
    </div>
  );
}
