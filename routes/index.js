var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Marco App' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(err, docs) {
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

/* GET Userlist page in json format. */
router.get('/userlist.json', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(err, docs) {
		res.json(docs);
	});
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
	res.render('newuser', {title: "Add New User"});
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
	var db = req.db;
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	var collection = db.get('usercollection');

	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function (err, doc) {
		if (err) {
			//It failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			//It worked, set the header so the address bar doesn't still say /adduser
			res.location("userlist");
			// Forward to success page
			res.redirect("userlist");
		}
	});
});

module.exports = router;