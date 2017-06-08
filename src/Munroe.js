/**
 *  This is the class that will present an interface to get data about xkcd comics.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// xkcd communicates with https
var https = require('https');

// cause other don't matter
var Promise = require('bluebird');

// cause we want to return an object
var Strip = require('./Strip.js');

// export class
module.exports = class {

    /**
     *  Get the newest strip
     *
     *  @return Promise
     */
    newest () {

        // the 0 is the newest one
        return this.strip(0);
    }

    /**
     *  Get a stripe by number.
     *
     *  @param  int         The number of the strip (0 for the newest one)
     *  @return Promise
     */
    strip(number) {

        // return a new promise of a strip
        return new Promise((resolve, reject) => {

            // get the data from xkcd
            https.get('https://xkcd.com/'+(number ? number + '/' : '')+'info.0.json', function(res) {

                // not OK?
                if (res.statusCode != 200) {

                    // reject the promise
                    reject();

                    // done here
                    return;
                }

                // so string can be got
                res.setEncoding('utf8');

                // we have to assembly the data by ourselfs
                var chunks = [];

                // push data
                res.on('data', (data) => {
                    chunks.push(data);
                });

                // when we are ready we can proceed
                res.on('end', function () {

                    // resolve with data that we gathered
                    resolve(new Strip(JSON.parse(chunks)));
                });

                // resume so we can get the body
                res.resume();
            });
        });
    }
};
