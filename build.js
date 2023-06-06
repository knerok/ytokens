const StyleDictionary = require('style-dictionary').extend('config.json');
const {ShadowTransform} = require('./transformers/ShadowTransform')
const {TypographyTransform} = require('./transformers/TypographyTransform')

StyleDictionary.registerTransform(ShadowTransform)
StyleDictionary.registerTransform(TypographyTransform)

const scssTransforms = StyleDictionary.transformGroup.scss || []

StyleDictionary.registerTransformGroup({
  name: 'scss',
  transforms: [
    ...scssTransforms,
    ShadowTransform.name,
    TypographyTransform.name,
  ]
});

StyleDictionary.buildAllPlatforms();
