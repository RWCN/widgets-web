import { defineConfig, type Plugin } from 'npm:rolldown-vite@^6.3.7'

import solid from 'npm:vite-plugin-solid@^2.11.6'
import cssInjectedByJs from 'npm:vite-plugin-css-injected-by-js@^3.5.2'
import dts from 'npm:vite-plugin-dts@^4.5.3'
import { dtscompat4deno } from 'jsr:@rwcn/vite-plugin-dtscompat4deno@0.0.1'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const plugins = [solid() as Plugin | Plugin[]]
  if (command == 'build') {
    plugins.push(
      dts({ tsconfigPath: './tsconfig.build.json' }) as Plugin,
      dtscompat4deno({
        entryFilePath: './lib.d.ts',
      }) as Plugin,
      cssInjectedByJs() as Plugin[]
    )
  }

  return {
    build: {
      lib: {
        name: 'RwcnWidgetsWeb',
        entry: ['src/lib.tsx'],
        fileName: (format, entry) => {
          switch (format) {
            case 'es':
            case 'esm':
              return `${entry}.js`
            default:
              return `${entry}.js`
          }
        },
        formats: ['es'],
        cssFileName: 'rwcn-widgets-web',
      },
      cssCodeSplit: false,
    },
    plugins,
  }
})
