let express = require('express'),
    app = express(),
    router = express.Router(),
    path = require('path'),
    db = require('./db/models/index.js'),
    bodyParser = require('body-parser'),
    chalk = require('chalk'),
    env = require(path.join(__dirname, '/env')),
    http = require("http"),
    volleyball = require("volleyball");


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.use(volleyball);

console.log(env);
app.set('env', env)

app.use('/api', require('./routes/index.js'));

router.use(function(req, res, next) {
    console.log('/' + req.method);
    next();
});

app.get('/', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});

// router.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

app.use(express.static(path.join(__dirname, '/assets')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules')));

app.use('*', router);

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


db.sync()
    .then(function() {
        var PORT = process.env.PORT || 3000;
        app.listen(PORT, function() {
            console.log('Live at Port 3000');
        });
    })
    .catch(function(err) {
        console.error(chalk.red(err.stack));
    });
