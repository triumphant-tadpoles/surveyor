const fetch = require('isomorphic-fetch');
var DocumentConversionV1 = require('watson-developer-cloud/document-conversion/v1');
const FormData = require('form-data');
const fs = require('file-system');
const docAnalyzer = require('./naturalLanguageUnderstanding.js');
const converterUser = process.env.WATSONCONVERTERUSER;
const converterPass = process.env.WATSONCONVERTERPASS;

let convertDoc = (doc, callback) => {

	var document_conversion = new DocumentConversionV1({
  	username:     converterUser,
  	password:     converterPass,
  	version_date: '2015-12-01'
	});

	let form = new FormData();
	form.append('config[conversion_target]', 'answer_units');

	document_conversion.convert({
	  // (JSON) ANSWER_UNITS, NORMALIZED_HTML, or NORMALIZED_TEXT 
	  file: fs.createReadStream(doc.files[0].path),
	  conversion_target: document_conversion.conversion_target.ANSWER_UNITS,

	}, function (err, response) {
	  if (err) {
			callback(err, null);
	  } else {
	    callback(null, response);
	  }
	});
};
module.exports = {
	convertDoc: convertDoc
}
