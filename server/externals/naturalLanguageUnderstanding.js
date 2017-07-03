const indeed = require('./indeed.js');
const fs = require('fs');
const path = require('path');
const analyzerUser = process.env.WATSONANALYZERUSER;
const analyzerPass = process.env.WATSONANALYZERPASS;

let serverPath = path.join(__dirname, '../');
let NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
let natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': analyzerUser,
  'password': analyzerPass,
  'version_date': '2017-02-27'
});

module.exports.analyze = (doc, callback) => {
  if (!doc.answer_units[0]) {
    console.log("Document error");
    return;
  }
  doc.answer_units[0].content[0].text
  var parameters = {
    'text': doc.answer_units[0].content[0].text,
    'features': {
      'entities': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      }
    },
    'language': 'en'
  }
  natural_language_understanding.analyze(parameters, function(err, result) {
    if (err) {
      callback(err, null);
    }
    else {
      let keywords = result.keywords.map((keyword) => {
        return keyword.text;
      });
      callback(null, keywords);
    }
  });
}