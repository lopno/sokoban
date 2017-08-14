import fs from 'fs-extra';
import xmlParser from 'xml2json';

export function convertLevelsFromTextToArray(inputPath) {
  // read file
  // could be done with a stream instead, but for such small files this should be ok
  return fs.readFile(inputPath, 'utf8')
    .then(data => {
      const dataLines = data.split('\n');
      let resultData = [];
      let tempData = [];
      dataLines.forEach((line) => {
        if (line.substr(0, 1) === ';') {
          resultData.push({
            name: line.substr(2, line.length),
            data: tempData,
          });
          tempData = [];
        }
        else if (line.length) {
          tempData.push(line.split(''));
        }
      });

      // array of objects
      // name, data
      // name is the name of the level
      // data is [[]]
      //return fs.writeFile(outputPath, JSON.stringify(resultData, null, 2));

      return resultData;

    });
}

export function convertLevelsFromXmlToJsObject(inputPath) {
  return fs.readFile(inputPath, 'utf8')
    .then(data => {
      const options = {
        object: true,
        trim: false,
      };
      const levelsJson = xmlParser.toJson(data, options);
      return levelsJson ? levelsJson.SokobanLevels : null;
    })
}