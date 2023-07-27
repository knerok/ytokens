const StyleDictionary = require('style-dictionary')

const toKebab = (str) => StyleDictionary.transform['name/cti/kebab'].transformer(
  { path: [str] },
  { prefix: '' },
);

const isTypographyToken = (token) => token.type === 'typography';

const typoographyFontWeightDict = {
  'Thin': '100', 
  'Thin Italic': '100', 
  'Extra Light': '200',
  'Extra Light Italic': '200',
  'Light': '300',
  'Light Italic': '300',
  'Regular': '400',
  'Italic': '400',
  'Medium': '500',
  'Medium Italic': '500',
  'Semi Bold': '600',
  'Semi Bold Italic': '600',
  'Bold': '700',
  'Bold Italic': '700',
  'Extra Bold': '800',
  'Extra Bold Italic': '800',
  'Black': '900',
  'Black Italic': '900',
}

const typographyTransformer = ({ value, name }) => {
  if (!value) return;

  const entries = Object.entries(value);

  const stringValue = entries.map(([key, value], idx) => {
    const separator = idx === entries.length - 1 ? '' : ';';
    let transformedValue = value

    if (key === 'fontWeight') {
      transformedValue = typoographyFontWeightDict[transformedValue] || value;
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
