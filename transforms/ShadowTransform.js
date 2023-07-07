const StyleDictionary = require('style-dictionary')

const isShadowToken = (token) => token.type === 'boxShadow'

const toRgba = (color) => StyleDictionary.transform['color/css'].transformer({value: color})

const shadowTransformer = (token) => {
  const {x, y, blur, spread, color, type} = token.value
  const prefix = type === 'innerShadow' ? 'inset ' : ''

  return `${prefix}${x} ${y} ${blur}px ${spread}px ${toRgba(color)}`
}

module.exports.ShadowTransform = {
  name: 'shadow/scss',
  type: 'value',
  matcher: isShadowToken,
  transformer: shadowTransformer,
}
