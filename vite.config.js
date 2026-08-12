import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        try {
          const distIndex = path.resolve(__dirname, 'dist/index.html')
          const dist404 = path.resolve(__dirname, 'dist/404.html')
          if (fs.existsSync(distIndex)) {
            fs.copyFileSync(distIndex, dist404)
          }
        } catch (e) {
          console.error('Failed to copy 404.html:', e)
        }
      },
    },
  ],
})
