const StyleDictionary = require('style-dictionary')

const toKebab = (str) => StyleDictionary.transform['name/cti/kebab'].transformer(
  { path: [str] },
  { prefix: '' },
);

const isTypographyToken = (token) => token.type === 'typography';

const typoographyFontWeightDict = {
  'Regular': '400',
  'Medium': '500',
}

const typographyTransformer = ({ value, name }) => {
  if (!value) return;

  const entries = Object.entries(value);

  const stringValue = entries.map(([key, value], idx) => {
    const separator = idx === entries.length - 1 ? '' : ';';
    let transformedValue = value

    if (key === 'fontWeight') {
      transformedValue = typoographyFontWeightDict[transformedValue];
    }

    return `$${name}-${toKebab(key)}: ${transformedValue}${separator}`
  }).join('\n');

  return `none;\n${stringValue}`;
};

module.exports.TypographyTransform = {
  name: 'typography/scss',
  type: 'value',
  transitive: true,
  matcher: isTypographyToken,
  transformer: typographyTransformer,
}
