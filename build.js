const StyleDictionary = require('style-dictionary').extend('config.json');
const {ShadowTransform} = require('./transformers')

StyleDictionary.registerTransform(ShadowTransform)

const scssTransforms = StyleDictionary.transformGroup.scss || []

StyleDictionary.registerTransformGroup({
  name: 'scss',
  transforms: [...scssTransforms, ShadowTransform.name]
});

StyleDictionary.buildAllPlatforms();
