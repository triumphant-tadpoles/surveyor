const bluebird = require('bluebird');
const express = require('express');
const fetch = require('isomorphic-fetch');
const geoip2 = require('geoip2');
const indeed = process.env.INDEED;

module.exports.indeed = (req, res, next) => {
  let chunk = '';
  let zip = 94110
  console.log(req.headers['x-forwarded-for']);
  req.on('data', data => {
    chunk += data;
  });
  req.on('end', () => {
    console.log(chunk);
    ipLookup(req.headers['x-forwarded-for']).then((result) => {
     zip = result.postal;
     console.log('///////////adsfadsf', zip, result);
     indeedFetch(req, res, next, zip, chunk); 
    }).catch(error => {
      indeedFetch(req, res, next, zip, chunk);
      console.log('///////////', zip, error);
    });
  });
}

let indeedFetch = (req, res, next, zip, query) => {
  console.log(zip);
  fetch(`http://api.indeed.com/ads/apisearch?format=json&v=2&publisher=${indeed}&q=${query}&I=${zip}&userAgent=${req.get('user-agent')}&limit=50`, {
    method: 'GET'
  }).then((response, error) =>{
    if (error) throw error;
    else return response.json();
  }).then((rjson, error) => {
    if (error) throw error;
    else res.send(rjson);
  }).catch(error => {
    console.log(error);
    res.send(error);
  });
}

let ipLookup = ip => {
  return new Promise((reject, resolve) => {
      geoip2.lookupSimple(ip, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
  });
}