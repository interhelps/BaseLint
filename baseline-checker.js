const { features } = require('web-features');

function isCssPropertyBaseline(propertyName) {
  const bcdKey = `css.properties.${propertyName}`;
  
  for (const [id, feature] of Object.entries(features)) {
    if (feature.compat_features?.includes(bcdKey)) {
      return feature.status.baseline === 'high' || feature.status.baseline === 'low';
    }
  }
  
  return false;
}

module.exports = { isCssPropertyBaseline };
