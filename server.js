var express = require('express');
var app = express();


/*==============================
            PAGES
  ==============================*/
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/src/index.html')
});
app.get('/en', function(req, res) {
    res.sendFile(__dirname + '/src/index_en.html')
});
app.get('/es', function(req, res) {
    res.sendFile(__dirname + '/src/index_es.html')
});



/*==============================
          Static Files
  ==============================*/
  app.use(express.static(__dirname + '/src/assets'));

app.use((req, res, next) => {
    res.status(404).redirect('/error/404')
});



// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});



app.listen(process.env.PORT || 5000, function() {
    console.log('Running done!')
});