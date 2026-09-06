import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel'; // 💡 Injected by the installer plugin

// https://astro.build
export default defineConfig({
  integrations: [react()],
  
  // 🚀 THE FIX: Connects Astro's server build engine straight to Vercel's infrastructure
  adapter: vercel(), 
  
  output: 'server', // Automatically sets up server deployment paths
  
  redirects: {
    '/admin': '/admin/index.html',
  },
});