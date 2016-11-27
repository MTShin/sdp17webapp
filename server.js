var Model = require('./models/models.js');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


var db = "mongodb://localhost/justatad_db";

mongoose.connect(db, function(err, response){
	if(err){
		console.log('Failed to connected to ' + db);
	}
	else {
		console.log('Connected to ' + db);
	}
});


var router = express.Router();


// GET

router.get('/api/trafficlist', function(request, response){

	Model.find({}, function(err, trafficlist){
		if(err){
			response.status(404).send(err);
		}
		else {
			response.status(200).send(trafficlist)
		}
	})

});

// DELETE

router.delete('/api/trafficlist/:id', function(request, response){
	var id = request.params.id;
	Model.remove({_id: id}, function(err, res){
		if(err){
			response.status(500).send(err);
		}
		else {
			response.status(200).send({message: 'success on deleting traffic'});
		}
	})
});

// PUT

router.put('/api/trafficlist', function(request, response){

	Model.findById(request.body._id, function(err, traffic){
		if(err){
			response.status(404).send(err);
		}
		else {
			traffic.update(request.body, function(err, success){
				if(err){
					response.send(err)
				}
				else {
					response.status(200).send({message: 'success'})
				}
			});
		}
	})

});



// POST

router.post('/api/trafficlist', function(request, response){
	console.log(request.body);
	var model = new Model();
	model.density = request.body.density;
	model.interval = request.body.interval;
	model.save(function(err, traffic){
		if(err){
			response.status(500).send(err)
		}
		else {
			response.status(201).send(traffic)
		}
	});
});


app.use('/', router);


app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;

app.listen(port , function(){
	console.log('Listening on port ' + port);
});


