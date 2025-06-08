import { defineConfig } from 'vite'; // <-- Важно: Използва се 'import', а не 'require'
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Или какъвто порт си избрал
    // host: true, // Ако си добавил това, остави го
  },
});