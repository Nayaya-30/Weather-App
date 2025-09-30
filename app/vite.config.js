import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Makes the server accessible from other devices on the network
    port: 3000, // Change to your preferred port
    open: true, // Automatically opens the browser when the server starts
  }
})
