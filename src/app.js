/* core modules */
const url = require('url');

/* contributed modules */
const express = require('express');

/* custom modules */
require('./db/mongoose.js');

/* models */
const User = require('./models/user');

const app = express();
app.use(express.json())

 
app.post('/users', (req, res) => {
	const user = new User(req.body);
	user.save().then((data) => {
		res.send(data);
	}).catch((error) => {
		res.status(400).send(error);
	});
});

app.get('/users', (req, res) => {
	/* case insensitive search is pending */
	const queryObject = url.parse(req.url,true).query;
	User.find(queryObject).then((data) => {
		if (!data.length) {
			res.status(400).send();
		}
		res.send(data);
	}).catch((error) => {
		res.status(400).send(error);
	});
});

app.put('/users/:id', function (req, res) {
	id = req.params.id;
	
	User.find( {_id: Object(id)} ).then((data) => {
		if (!data.length) {
			res.status(400).send();
		}
		var saveData = data[0];
		for (x in req.body) {
			saveData[x] = req.body[x];
		}
		
		var user = new User(saveData).save().then((updatedData) => {
			res.send(updatedData);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}).catch((error) => {
		res.status(400).send(error);
	});
});

app.delete('/users/:id', (req, res) => {
	var id = req.params.id;
	User.findOneAndDelete({_id : Object(id)}).then((data) => {
		if (!data.length) {
			res.status(400).send();
		}
		res.send(data);
	}).catch((error) => {
		res.status(400).send(error);
	});
});
 
app.listen(3000, () => {
	console.log('Listening on port: 3000');
});