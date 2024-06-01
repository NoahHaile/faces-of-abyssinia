import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import MenuAppBar from "@/components/appbar";


export const metadata: Metadata = {
  title: "Faces of Abyssinya",
  description: "Learn and test your knowledge of Ethiopian Culture & History",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
     
            <MenuAppBar/>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
        
    </html>
  );
}
