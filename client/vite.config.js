import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'https://school-crm-puce.vercel.app/',
        secure:false,
      },
    },
  },
  plugins: [react()],
})
