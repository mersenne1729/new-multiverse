/*include external resources*/

var express = require('express');
var unirest = require('unirest');
var events = require('events');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var app = express();
var Item = require('./models/item');
app.use(express.static('public'));
app.use(bodyParser.json());


/*declaration of api end points (app.get)*/



/* STEP 2 - creating objects and constructors*/
var runServer = function (callback) {
    mongoose.connect(config.DATABASE_URL, function (err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function () {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
};

//external api call function
var getFromWikipedia = function (searchTerm, args) {
    var emitter = new events.EventEmitter();
    //console.log("inside getFromWikipedia function");
    unirest.get('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&format=json&callback=?')
        .qs(args)
        //after api call we get the response inside the "response" parameter
        .end(function (response) {
            //success scenario
            if (response.ok) {
                emitter.emit('end', response.body);
            }
            //failure scenario
            else {
                emitter.emit('error', response.code);
            }
        });
    return emitter;
};

app.get('/search/:name', function (req, res) {
    

    //    external api function call and response

    var searchReq = getFromWikipedia(req.params.name, {
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json"
    });

    //get the data from the first api call
    searchReq.on('end', function (item) {

        //get the artists and ID for use in next call
        res.json(item);
    });

    //error handling
    searchReq.on('error', function (code) {
        res.sendStatus(code);
    });

});

app.post('/favorites', function (req, res) {
    

    console.log("request body = ", req.body);

    //db connection and data queries
        Item.create({
            name: req.body.name,
            type: req.body.type
        }, function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(item);
        });
});

app.get('/populate-favorites', function (req, res) {
    Item.find(function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);
    });
});

app.delete('/delete-favorites', function (req, res) {
    Item.remove(req.params.id, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(200).json(items);
    });
});