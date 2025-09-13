import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@302-ai-studio/shared': resolve(__dirname, '../../../packages/shared/src'),
      '@302-ai-studio/ui': resolve(__dirname, '../../../packages/ui/src/lib')
    }
  }
})