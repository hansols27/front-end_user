'use client';

import { useEffect, useState } from 'react';

export type DeviceType = 'pc' | 'mo';

export function useDevice(): DeviceType | null {
  const [device, setDevice] = useState<DeviceType | null>(null);

  useEffect(() => {
    const check = () => {
      setDevice(window.innerWidth <= 768 ? 'mo' : 'pc');
    };

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return device;
}