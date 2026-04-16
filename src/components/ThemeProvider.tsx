"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Tipni ichki papkadan qidirmasdan, to'g'ridan-to'g'ri komponentning o'zidan olamiz:
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}