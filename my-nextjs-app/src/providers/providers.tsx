"use client"

import { ThemeProvider } from "next-themes"
import React from "react"

interface providerProps {
    children: React.ReactNode
}
const Providers = ({children}: providerProps) => {
  return (
    <ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					themes={["dark", "light"]}
				>
                    {children}
                </ThemeProvider>
  )
}

export default Providers