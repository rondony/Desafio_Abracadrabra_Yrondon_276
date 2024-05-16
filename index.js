import express from 'express';
import path from 'path';

// 1. Crear un servidor con Express en el puerto 3000.
const app = express();
const PORT = 3000;
const numero = Math.floor(Math.random() * (4)) + 1

function numberRandom() {
    return Math.floor(Math.random() * 4) + 1;
  }

const users = [
    'wilkerman',
    'yuleysy',
    'yohnkelly',
    'yaksury',
    'yulerbiss',
    'yorkleyver',
]

app.listen(PORT, ()=>{
    console.log(`Servidor Chamos del Veintitles ${PORT}`);
})
    
// 2. Definir la carpeta “assets” como carpeta pública del servidor.
app.use(express.static('assets'))


// 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de
// la ruta /abracadabra/usuarios.
app.get('/abracadabra/usuarios', (req, res) => {
    res.json(users)


//4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el
//   usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en
//   el servidor.
//   En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario
//   devolver la imagen “who.jpeg”.
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;
    if(users.includes(usuario)){
        next();
    }else{
        res.redirect('/who.jpeg');
    }
})

/*  ROUTES */

})

app.get('/abracadabra/juego/:usuario', async (req, res) => {
    res.send(`
      <html>
        <body>
          <h1>has elegido a un usuario dentro de nuestra lista!!!</h1>
          <img src="/assets/img/sombrero.png" alt="Sombrero">
          <script>
            setTimeout(function() {
              window.location.href = '/';
            }, 3000);
          </script>
        </body>
      </html>
    `);
  });
  
app.get('/', async (req, res) => {
    res.sendFile('index.html', { root: '.' });
});


// 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el
//    número generado de forma aleatoria.
//    En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la
//    imagen de Voldemort.

app.get('/abracadabra/conejo/:n', (req, res) => {
    let n = req.params.n
    let number = numberRandom()
    console.log("4:", number);
    //res.send([n, numero])
    n == number ? res.redirect('/img/conejito.jpg') : res.redirect('/img/voldemort.jpg');
    
})

// ERROR ROUTES

// 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al
//    consultar una ruta que no esté definida en el servidor.
app.use('*', (req, res) => {
    res.status(404).send('<h1>Pana!!! este sitio Web no existe...</h1>');
})