const bluebird = require('bluebird');
const express = require('express');
const fetch = require('isomorphic-fetch');
const geoip2 = require('geoip2');
const bodyParser = require('body-parser');
const indeed = process.env.INDEED;

module.exports.indeed = (details, res, next) => {
  console.log('inside indeed...');
  let city = 'san francisco';
  let state = 'CA';
  details.city = 'san francisco';
  details.state = 'CA';
    ipLookup(details.ip).then((result) => {
      console.log('iplookup result', result);
      console.log(result);
      details.city = result.city;
      details.state = result.subdivision;
     indeedFetch(details, res, next); 
    }).catch(error => { 
      // console.log('iplookup ERROR:', error);
      // console.log('details=', details);
      indeedFetch(details, res, next);
    });
}

let indeedFetch = (data, res, next) => {
  fetch(`http://api.indeed.com/ads/apisearch?format=json&v=2&publisher=${indeed}&q=${data.body}&l=${data.city}%2C+${data.state}&userAgent=${data.userAgent}&limit=100&fromage=10&radius=100`, {
    method: 'GET'
  }).then((response, error) =>{
    if (error) throw error;
    else return response.json();
  }).then((rjson, error) => {
    // console.log('result from indeed....', rjson);
    if (error) throw error;
    else res.send(rjson);
  }).catch(error => {
    // console.log('ERROR from indeed fetch:', error);
    res.send(error);
  });
}

let ipLookup = ip => {
  return new Promise((reject, resolve) => {
      geoip2.lookupSimple(ip, (result, error) => {
        if (error) reject(error);
        else resolve(result);
      });
  });
}