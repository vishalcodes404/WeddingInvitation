import './globals.css'

export const metadata = {
  title: 'Vysakh & Sandra | Wedding Invitation — 13 Dec 2026',
  description:
    'With the blessings of Lord Ganesha, Mr. Baiju S. & Mrs. Radha Baiju cordially invite you to the wedding of Vysakh & Sandra on Sunday, 13th December 2026 at Subramanya Swamy Temple, Thiruvanchoor.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f6f2d9',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
