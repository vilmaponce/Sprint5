import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  optimizeDeps: {
    include: ['sweetalert2', 'sweetalert2-react-content'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
})
