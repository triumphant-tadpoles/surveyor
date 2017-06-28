const bluebird = require('bluebird');
const express = require('express');
const fetch = require('isomorphic-fetch');
const geoip2 = require('geoip2');
const indeed = process.env.INDEED;

module.exports.indeed = (req, res, next) => {
  let chunk = '';
  let zip = 94110
  let city = 'san francisco';
  let state = 'CA';
  console.log(req.headers['x-forwarded-for']);
  req.on('data', data => {
    chunk += data;
  });
  req.on('end', () => {
    console.log(chunk);
    ipLookup(req.headers['x-forwarded-for']).then((result) => {
     zip = result.postal;
     city = result.city;
     state = result.subdivision;
     console.log('///////////adsfadsf', city, state, result);
     indeedFetch(req, res, next, result.city, result.subdivision, chunk); 
    }).catch(error => {
      indeedFetch(req, res, next, city, state, chunk);
      console.log('///////////', city, state, error);
    });
  });
}

let indeedFetch = (req, res, next, city, state, query) => {
  fetch(`http://api.indeed.com/ads/apisearch?format=json&v=2&publisher=${indeed}&q=${query}&l=${city}%2C+${state}&userAgent=${req.get('user-agent')}&limit=50&fromage=10`, {
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
      geoip2.lookupSimple(ip, (result, error) => {
        if (error) reject(error);
        else resolve(result);
      });
  });
}