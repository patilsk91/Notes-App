import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Update this to your repository name for GitHub Pages deployment
  // For example, if your repo URL is https://github.com/user/my-app, set base to '/my-app/'
  base: '/Notes-App/',
  define: {
    // This makes the environment variable available in your client-side code
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
})