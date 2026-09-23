import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Brilian Ade Putra (Billy) - AI Engineer Portfolio',
    short_name: 'Billy Portfolio',
    description: 'AI and software engineer in Tokyo building AI assistants, integrations, mobile apps, and full-stack software.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfbfd',
    theme_color: '#0071e3',
    orientation: 'portrait',
    categories: ['portfolio', 'professional', 'technology'],
    lang: 'en',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
