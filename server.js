var express = require('express'),
    app = module.exports.app = express(),
	logger = require('morgan'),
	db = require('mongojs').connect('microdb'),
	bodyParser = require('body-parser');

	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(express.static(__dirname + '/app'));

/* Routes */
// Read
app.get('/api/:collection1/with/:collection2', function(req, res) {
//    db.collection(req.params.collection).findOne({_id:objectId(req.params.id)}, fn(req, res))

	var types = {};
//	db.devicetypes.query({"_id" : {$in : typeids}}).forEach( function (val) {
    console.log("req.params.collection2="+req.params.collection2);
	db.collection(req.params.collection2).find({}).toArray( function (err, docs) {
//        console.log("docs.length="+docs.length);
		for(var i=0; i<docs.length; i++) {
			types[docs[i]._id] = docs[i];
		}
 		var devices = [];
		db.collection(req.params.collection1).find({}).toArray(function (err2, docs2) {
			for(var k=0; k<docs2.length; k++) {
				  docs2[k].devmodel = types[docs2[k].type];
				  devices.push(docs2[k]);
			  }
			res.contentType('application/json');
			res.send(devices);
		});
	});


/*
	$scope.devices = Device.query().map( function (val) {
	  console.log("device="+val.name);
	  val.devicetype = types[val.type];
	  return val;
	});
*/
});

// Query
app.get('/api/:collection', function(req, res) {
    var item, sort = {}, qw = {};
    for (item in req.query) {
        req.query[item] = (typeof +req.query[item] === 'number' && isFinite(req.query[item]))
            ? parseFloat(req.query[item],10)
            : req.query[item];
        if (item != 'limit' && item != 'skip' && item != 'sort' && item != 'order' && req.query[item] != "undefined" && req.query[item]) {
            qw[item] = req.query[item];
        }
    }
    if (req.query.sort) { sort[req.query.sort] = (req.query.order === 'desc' || req.query.order === -1) ? -1 : 1; }
    db.collection(req.params.collection).find(qw).sort(sort).skip(req.query.skip).limit(req.query.limit).toArray(fn(req, res))
});

// Read
app.get('/api/:collection/:id', function(req, res) {
    db.collection(req.params.collection).findOne({_id:objectId(req.params.id)}, fn(req, res))
});

// Save
app.post('/api/:collection', function(req, res) {
    if (req.body._id) { req.body._id = objectId(req.body._id);}
    db.collection(req.params.collection).save(req.body, {safe:true}, fn(req, res));
});

// Delete
app.delete('/api/:collection/:id', function(req, res) {
    db.collection(req.params.collection).remove({_id:objectId(req.params.id)}, {safe:true}, fn(req, res));
});

//Group
app.put('/api/:collection/group', function(req, res) {
    db.collection(req.params.collection).group(req.body, fn(req, res))
});

// MapReduce
app.put('/api/:collection/mapReduce', function(req, res) {
    if (!req.body.options) {req.body.options  = {}};
    req.body.options.out = { inline : 1};
    req.body.options.verbose = false;
    db.collection(req.params.collection).mapReduce(req.body.map, req.body.reduce, req.body.options, fn(req, res));
});

// Command (count, distinct, find, aggregate)
app.put('/api/:collection/:cmd',  function (req, res) {
    if (req.params.cmd === 'distinct') {req.body = req.body.key}
    db.collection(req.params.collection)[req.params.cmd](req.body, fn(req, res));
});

app.listen(3000, function() {
    console.log("Listening on 3000");
});

/* Helpers */

//To allow use ObjectId or other any type of _id
var objectId = function (_id) {
    if (_id.length === 24 && parseInt(db.ObjectId(_id).getTimestamp().toISOString().slice(0,4), 10) >= 2010) {
        return db.ObjectId(_id);
    }
    return _id;
}

//Function callback
var fn = function (req, res) {
    res.contentType('application/json');
    var fn = function (err, doc) {
    //console.log('asdasdas',req.body ,err,doc)
        if (err) {
            if (err.message) {
                doc = {error : err.message}
            } else {
                doc = {error : JSON.stringify(err)}
            }
        }
        if (typeof doc === "number" || req.params.cmd === "distinct") { doc = {ok : doc}; }
        res.send(doc);
    };
    return fn;
};

