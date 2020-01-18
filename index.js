const path = require('path')
const UglifyJS = require('uglify-es')

const handleStaticResource = (dist, match, compilation) => {
  const hits = Object.keys(compilation.assets).filter(key => {
    return match.test(path.join(dist, key))
  })
  hits.forEach(hit => {
    let content = compilation.assets[hit].source()
    if (content instanceof Buffer) {
      content = content.toString('utf8')
    }
    const result = UglifyJS.minify(content, {
      mangle: {
        toplevel: true
      }
    })
    if (!result.error) {
      compilation.assets[hit] = {
        source() {
          return result.code
        },
        size() {
          return result.code.length
        }
      }
    }
  })
}

class UglifyStaticJSWebpackPlugin {
  constructor(options = {}) {
    if ('staticPaths' in options) {
      if (!Array.isArray(options.staticPaths)) {
        throw new Error(
          '[UglifyStaticJSWebpackPlugin Error]: staticPaths parameter type must be Array'
        )
      }
      this.options = options
    } else {
      this.options = null
    }
  }
  apply(compiler) {
    console.log('\n===UglifyStaticJSWebpackPlugin===')
    if (this.options) {
      const dirs = this.options['staticPaths']
      const dist = compiler.options.output.path
      let regStr = ''
      regStr = dirs
        .map((d, i) => {
          if (!path.isAbsolute(d)) {
            d = path.join(dist, d)
          }
          return '^{word}\\b'.replace('{word}', d)
        })
        .join('|')
      const match = new RegExp(`^${regStr}\\b`, 'gi')
      if (compiler.hooks) {
        compiler.hooks.emit.tap('UglifyStaticJSWebpackPlugin', compilation => {
          handleStaticResource(dist, match, compilation)
        })
      } else {
        compiler.plugin('emit', (compilation, callback) => {
          handleStaticResource(dist, match, compilation)
          callback()
        })
      }
    }
    console.log('\n===/UglifyStaticJSWebpackPlugin===')
  }
}

module.exports = UglifyStaticJSWebpackPlugin
