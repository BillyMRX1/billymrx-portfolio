import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Brilian Ade Putra (Billy) - AI Engineer Portfolio',
    short_name: 'Billy Portfolio',
    description: 'AI Engineer at Honda Japan building intelligent products with machine learning, data platforms, and full stack software craftsmanship.',
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
