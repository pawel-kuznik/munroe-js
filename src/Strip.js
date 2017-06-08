/**
 *  This is a class that will wrap around the the strip data.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// the data symbol
let _data = Symbol('data');

// export the strip data
module.exports = class {

    /**
     *  Constructor.
     *
     *  @param  object The data that we got from XKCD.
     */
    constructor (data) {

        // remember the data
        this[_data] = data;
    }

    /**
     *  The number of the image.
     *
     *  @return     int
     */
    number() {
        return this[_data].num;
    }

    /**
     *  Get the title
     *
     *  @return string
     */
    title() {
        return this[_data].title;
    }

    /**
     *  Get the safe title
     *
     *  @return string
     */
    safeTitle() {
        return this[_data].safe_title;
    }

    /**
     *  Get the original data
     *
     *  @return     object  The orignal data
     */
    data () {
        return this[_data];
    }

    /**
     *  Get the link to the strip.
     *
     *  @return     string  The perma link to this strip
     */
    link () {

        return this[_data].link ? this[_data].link : 'https://xkcd.com/' + this[_data].number;
    }

    /**
     *  Return date from when the strip is.
     *
     *  @return Date
     */
    date() {

        // construct the date
        var date = new Date();

        // set day
        date.setDate(this[_data].day);

        // -1 month cause js Data is insane
        date.setMonth(this[_data].month - 1);

        // set year
        date.setYear(this[_data].year);

        // return prepared date object
        return date;
    }

    /**
     *  Get the url to the image
     *
     *  @return string  The url to the image
     */
    image() {
        return this[_data].img;
    }

    /**
     *  The alrenative text
     *
     *  @return string
     */
    alt() {
        return this[_data].alt;
    }
};
