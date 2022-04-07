var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
//Con esta línea de código le especificamos a nuestra app de express que use como
//view engine a ejs, por lo que ahora express hará sus conexiones con ejs.

app.use('/', function (req, res, next) {
    console.log('Request Url:' + req.url);
    next();
});

app.get('/', function (req, res) {
    res.render('index');
});
//Ahora en lugar de poner el html en el res.send, pondremos res.render porque el template engine se
//encarga de renderizar ese contenido. Esto además hace que se vea más estético y entendible, pues no contiene
//todo el html en una sola línea.

app.get('/person/:id', function (req, res) {
    res.render('person', {ID: req.params.id});
});
//Hacemos lo mismo que en la función anterior, sin embargo ahora como también requiere un dato, se lo pasamos por medio
//de un JSON, por lo que el template engine se encargará de renderizar la vista person con el dato ID, que se obtiene de
//req.params.id

app.get('/api', function (req, res) {
    res.json({ firstname: 'John', lastname: 'Doe'});
});

app.listen(port);
//Este es el contenido de la práctica 11, la práctica anterior.

//Para que esto funcione debemos agregar una carpeta nombrada views, que contenga
//un archivo nombrado index.ejs
//Ojo: es muy importante que el nombre de la carpeta sea exactamente views, y que el
//nombre del archivo si o si contenga la terminación .ejs, no .html como comunmente se les llama.

//También debemos crear un archivo en la carpeta views con el nombre de person.ejs, esta
//será otra vista disponible para ejs, es importante mencionar que todas estos archivos aunque sean
//con terminación .ejs, son archivos html totalmente válidos.

//index.ejs es estática, sin embargo, person.ejs es dinámico, puesto que recibe el valor de ID. Y este
//es pasado a la vista mediante el "route handler".

//El resultado es similar a la práctica interior, sin embargo, ahora la diferencia radica en que quien se
//encarga de renderizar es el template engine, no express, por lo que express unicamente se encarga de estar a 
//la escucha y enviar respuesta, más no de hacer el procesamiento de lo que va a mostrar. Por esto es que es recomendable
//usar los template engines, puesto que se hace una división de "responsabilidades" y el software queda más organizado y limpio.