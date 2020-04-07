const generatedUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
  it('should generate an unique ID', () => {
    const id = generatedUniqueId();
    expect(id).toHaveLength(8);
  });
});