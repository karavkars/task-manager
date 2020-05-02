const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'task-manager';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  if (err) {
	  return console.log("Unable to connect to database");
  }
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  const insertUsers = function(db, callback) {
	  // Get the documents collection
	  const collection = db.collection('users');
	  // Insert some documents
	  collection.insertMany([
		{name : 'Andrew', age:27},
		{name : 'Mike', age:28},
		{name : 'kane', age:29},
	  ], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 users into the collection");
		callback(result);
	  });
	}
	
	const insertDocuments = function(db, callback) {
	  // Get the documents collection
	  const collection = db.collection('documents');
	  // Insert some documents
	  collection.insertMany([
		{description : 'Clean house today', completed: true},
		{description : 'watch a movie', completed: false},
		{description : 'Go for a walk', completed: false},
	  ], function(err, result) {
		console.log("Inserted 3 documents into the collection");
		callback(result);
	  });
	}
	
	// Find some documents
	const findDocuments = function(db, callback) {
		// Get the documents collection
		const collection = db.collection('documents');
		collection.find({description:"Clean house today"}).toArray(function(err, docs) {
			callback(docs);
		});

	}
	
	/* insertUsers(db, (result) => {
		console.log(result);
	}); */
	
	
/* 	insertDocuments(db, (result) => {
		console.log(result);
	}); */
	
	findDocuments(db, (result) => {
		console.log("Found the following records");
		console.log(result);
	});

	client.close();
});
