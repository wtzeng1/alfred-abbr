'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var querystring = _interopDefault(require('querystring'));
var fastXMLParser = _interopDefault(require('fast-xml-parser'));
var alfy = _interopDefault(require('alfy'));

const API_URL = 'http://www.stands4.com/services/v2/abbr.php';
const UID = 'uid';
const TOKEN_ID = 'token_id';

function genQueryURL(term, searchType = 'e', sortby = 'p') {
  const params = {
    uid: UID,
    tokenid: TOKEN_ID,
    searchType,
    sortby,
    term,
  };
  return API_URL + '?' + querystring.stringify(params)
}

function formatResponse(data) {
  return data.map((item, index) => ({
    title: item.definition,
    subtitle: `Category: ${item.category}`,
    arg: index,
  }))
}

function query(term, searchType, sortby) {
  const url = genQueryURL(term, searchType, sortby);

  return alfy.fetch(url, {json: false}).then((responseXML) => {
    const responseJson = fastXMLParser.parse(responseXML);
    if (responseJson.results.result) {
      return formatResponse(responseJson.results.result)
    } else {
      return [{
        title: 'No result...',
        subtitle: 'Abbreviation...',
        arg: 0,
      }]
    }
  })
}

query(alfy.input).then(data => {
  alfy.output(data);
});
