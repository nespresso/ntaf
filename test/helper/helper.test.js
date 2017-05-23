'use strict';

const helper = require('lib/helper/helper');

describe('Helper', function () {
  it('should replace placeholder', function () {
    expect(helper.replacePlaceholders('/mosaic/{marketCode}/{languageCode}', {
      marketCode: 'ch',
      languageCode: 'en',
    })).to.equal('/mosaic/ch/en');
    expect(helper.replacePlaceholders('/mosaic/{marketCode}/{languageCode}', { marketCode: 'ch' })).to.equal('/mosaic/ch/{languageCode}');
  });
});
