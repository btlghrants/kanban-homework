"use client"

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

function SetTheme() {
  const { setTheme } = useTheme();
  useEffect(() => { setTheme("light"); /* light, dark, system */ }, []);
  return <></>;
}

export default SetTheme;