import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/api/',
        '/_next/',
        '/admin/',
      ],
    },
    sitemap: 'https://billymrx.vercel.app/sitemap.xml',
  }
}