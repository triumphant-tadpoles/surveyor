const bluebird = require('bluebird');
const express = require('express');
const fetch = require('isomorphic-fetch');

module.exports.indeed = (req, res, next) => {
  let chunk = '';
  req.on('data', data => {
    chunk += data;
  });
  req.on('end', () => {
    console.log(chunk);
    fetch(`http://api.indeed.com/ads/apisearch?format=json&v=2&publisher=${'publisher id goes here'}&q=${chunk}&i=san francisco, ca&userAgent=${req.get('user-agent')}`, {
      method: 'GET'
    }).then((response, error) =>{
       if (error) throw error;
       else return response.json();
    }).then((rjson, error) => {
      if (error) throw error;
      else res.send(rjson);
    }).catch(error => {
      console.log(error);
    });
  });
}