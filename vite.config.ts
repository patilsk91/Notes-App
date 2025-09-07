import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Update this to your repository name for GitHub Pages deployment
  // For example, if your repo URL is https://github.com/user/my-app, set base to '/my-app/'
  base: '/<YOUR_REPO_NAME>/'
})
