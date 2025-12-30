'use client';

import Image from 'next/image';

export function BrandLogo({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/logo_dark.png"
        alt="OpenAthlete"
        className={`${className || 'h-6 w-auto'} dark:hidden`}
        width={120}
        height={30}
        priority
      />
      <Image
        src="/logo_white.png"
        alt="OpenAthlete"
        className={`${className || 'h-6 w-auto'} hidden dark:block`}
        width={120}
        height={30}
        priority
      />
    </>
  );
}

