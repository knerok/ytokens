const isShadowToken = (token) => token.type === 'boxShadow'

const shadowTransformer = (token) => {
  const {x, y, blur, spread, color, type} = token.value
  const prefix = type === 'innerShadow' ? 'inset ' : ''

  return `${prefix}${x}px ${y}px ${blur}px ${spread}px ${color}`
}

const ShadowTransform = {
  name: 'shadow/scss',
  type: 'value',
  matcher: isShadowToken,
  transformer: shadowTransformer,
}

module.exports = {
  source: ['tokens/**/*.json'],
  transform: {
    'shadow/scss': ShadowTransform,
  },
  platforms: {
    scss: {
      buildPath: 'dist/',
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css',
        'shadow/scss',
      ],
      files: [{
        destination: 'variables.scss',
        format: 'scss/variables',
      }],
    },
  },
}
