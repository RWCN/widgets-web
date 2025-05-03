import { defineConfig, type Plugin } from 'npm:rolldown-vite@^6.3.7'

import solid from 'npm:vite-plugin-solid@^2.11.6'
import cssInjectedByJs from 'npm:vite-plugin-css-injected-by-js@^3.5.2'
import dts from 'npm:vite-plugin-dts@^4.5.3'
import process from 'node:process'
import path from 'node:path'
import glob from 'npm:fast-glob@^3.3.3'
import fs from 'node:fs/promises'
import console from 'node:console'

const dtsImportExtensionPlugin = (): Plugin => {
  let outDir = 'dist'
  const entryFiles: string[] = []

  return {
    name: 'dts-import-extension-enhanced',

    configResolved(config) {
      outDir = config.build.outDir || 'dist'
    },

    generateBundle(_options, bundle) {
      entryFiles.length = 0
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk' && chunk.isEntry) {
          entryFiles.push(fileName)
        }
      }
    },

    async writeBundle() {
      const distPath = path.resolve(process.cwd(), outDir)

      // 处理所有.d.ts文件
      const dtsFiles = await glob('**/*.d.ts', {
        cwd: distPath,
        absolute: true,
        ignore: ['**/node_modules/**'],
      })

      const importRegex =
        /(from\s+["'])(.*?)(\.(js|ts|mjs|cjs|tsx|jsx))(\?.*?)?(["'])/g

      for (const filePath of dtsFiles) {
        try {
          let content = await fs.readFile(filePath, 'utf-8')
          content = content.replace(
            importRegex,
            (_, start, path, _ext, _extType, query, end) => {
              return `${start}${path}.d.ts${query || ''}${end}`
            }
          )
          await fs.writeFile(filePath, content)
        } catch (e) {
          console.error(`处理文件 ${filePath} 失败:`, e)
        }
      }

      // 为入口文件添加注释
      for (const entry of entryFiles) {
        const entryPath = path.join(distPath, entry)
        try {
          if (
            await fs
              .access(entryPath)
              .then(() => true)
              .catch(() => false)
          ) {
            let content = await fs.readFile(entryPath, 'utf-8')
            content = `// @ts-self-types="./lib.d.ts"\n${content}`
            await fs.writeFile(entryPath, content)
          }
        } catch (e) {
          console.error(`处理入口文件 ${entryPath} 失败:`, e)
        }
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const plugins = [solid() as Plugin | Plugin[]]
  if (command == 'build') {
    plugins.push(
      dts({ tsconfigPath: './tsconfig.build.json' }) as Plugin,
      dtsImportExtensionPlugin(),
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
