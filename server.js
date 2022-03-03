const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//------------------ mangodb connection----------------
const dbUrl = 'mongodb+srv://contact_app:capp123456@cluster0.ueqg7.mongodb.net/contact?retryWrites=true&w=majority';

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('connected to databse');
	})
	.catch((err) => {
		console.log(`connction failed due to ${err}`);
	});

const contact = require('./database/contact');
//------- routes ----------------

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/src/signin.html');
});
app.get('/signup', (req, res) => {
	res.sendFile(__dirname + '/src/signup.html');
});
app.get('/dashboard', (req, res) => {
	res.sendFile(__dirname + '/src/dash.html');
});
app.get('/h/:id', (req, res) => {
	uid = req.params.id;
	res.sendFile(__dirname + '/src/dash.html', uid);
});
//--------------------encryption--------------------------
/*
function encryptpassword(req, res, next) {
	console.log(req.body.upassword);
	bcrypt.hash(req.body.upassword, 10, (err, hashedPassword) => {
		if (err) {
			res.json({ error: err });
		}
	});
	next();
}*/
//------------------------apis------------------------------

app.post('/api/newuser', (req, res) => {
	let newContact = new contact({
		email: req.body.uemail,
		password: req.body.upassword,
		secret: req.body.usecret
	})
		.save()
		.then((result) => {
			console.log(`user added ${result}`);
			res.send(result);
		})
		.catch((err) => {
			res.send({ error: err });
		});
});

app.post('/api/userlogin', (req, res) => {
    let	emails = req.body.Email;
	let Passwords = req.body.Password;
	contact
		.findOne({ email: emails })
		.then((Result) => {
			if (Result != null) {
				console.log(Result);
                console.log(Result.password);
                console.log(req.body.Password);
				if (Result.password === Passwords) {
					console.log('pasword match');
                    let arr = [3,Result._id];
                    res.send(arr)
					// res.send(Result);
				} else {
                    console.log("incorrect password")
                    let arr = [2];
                    res.send(arr)
				}
			} else {
				console.log('plaese sign in');
                let arr = [1];
                res.send(arr)
			}
		})
		.catch((err) => {
			console.log(err);
		});
});
app.get('/api/tables', (req, res) => {

    let userId = req.headers.uid;
    contact.findOne({_id: userId})
    .then(result => {
        if(result != null) {
            res.send(result);
        }
    }).catch(err => {
        console.log(err);
    })

});
app.post('/api/addData', (req, res) => {
	let userid = req.headers.uid;
	console.log(userid);
	contact
		.findOneAndUpdate(
			{ _id: userid },
			{ $push: { contacts: { cname: req.body.uname, phoneNumber: req.body.uphno, cemail: req.body.uemail } } },{new: true},
			(err, data) => {
				if (err) {
					console.log(err);
				} else {
					console.log(data);
                    res.send(data);
				}
			}
		)
		.catch((err) => console.log(err));
});

//------  listening  ----------------
const port = 3500;

app.listen(port, console.log(`app is listen to port  :: ${port}`));
