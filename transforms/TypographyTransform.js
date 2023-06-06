const StyleDictionary = require('style-dictionary')

const toKebab = (str) => StyleDictionary.transform['name/cti/kebab'].transformer(
  { path: [str] },
  { prefix: '' },
);

const isTypographyToken = (token) => token.type === 'typography';

const typographyTransformer = ({ value, name }) => {
  if (!value) return;

  const entries = Object.entries(value);

  const stringValue = entries.map(([key, value], idx) => {
    const separator = idx === entries.length - 1 ? '' : ';';

    return `$${name}-${toKebab(key)}: ${value}${separator}`
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
