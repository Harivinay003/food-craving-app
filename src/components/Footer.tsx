'use client';

import * as React from 'react';

export function Footer() {
  const [year, setYear] = React.useState('');

  React.useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className="py-6 md:px-8 md:py-0 bg-background/95">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {year} Menu Maestro. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
