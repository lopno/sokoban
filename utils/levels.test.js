import {
  convertLevelsFromTextToArray,
  convertLevelsFromXmlToJsObject,
} from './levels';

describe('levels utils', () => {
  describe('convertLevelsFromTextToArray', () => {
    let resultData = null;

    beforeAll(() => {
      const inputTestFilePath = `${__dirname}/../assets/levels/100Boxes.txt`;
      return convertLevelsFromTextToArray(inputTestFilePath)
        .then(result => {
          resultData = result;
        });
    });

    it('convert a file', () => {
      expect(resultData).toBeTruthy();
      expect(Array.isArray(resultData)).toBe(true);
    });
  });

  describe('convertLevelsFromXmlToJsObject', () => {
    let convertedObject = null;

    beforeAll(() => {
      const inputTestFilePath = `${__dirname}/../assets/levels/100Boxes.slc`;
      return convertLevelsFromXmlToJsObject(inputTestFilePath)
        .then(result => {
          convertedObject = result;
        });
    });

    it('should return an object', () => {
      expect(convertedObject).toBeTruthy();
      expect(typeof convertedObject).toBe('object');
    });

    it('should have information about levels', () => {
      expect(convertedObject.LevelCollection).toBeTruthy();
      expect(typeof convertedObject.LevelCollection).toBe('object');
      expect(convertedObject.LevelCollection.MaxWidth).toBeTruthy();
      expect(convertedObject.LevelCollection.MaxHeight).toBeTruthy();
    });

    it('should have a list of levels', () => {
      expect(convertedObject.LevelCollection.Level).toBeTruthy();
      expect(Array.isArray(convertedObject.LevelCollection.Level)).toBe(true);
    });

    it('levels should ok', () => {
      convertedObject.LevelCollection.Level.forEach((level) => {
        expect(level).toBeTruthy();
        expect(typeof level).toBe('object');
        expect(level.Id).toBeTruthy();
        expect(level.Width).toBeTruthy();
        expect(level.Height).toBeTruthy();
        expect(level.L).toBeTruthy();
        expect(Array.isArray(level.L)).toBe(true);
        expect(level.L.length).toBe(parseInt(level.Height));
      })
    })
  });
});
