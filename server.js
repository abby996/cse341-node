const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Optional Swagger — only mount if package + JSON are present
try {
    const swaggerUi = require('swagger-ui-express');
    const possible = [
        path.join(__dirname, 'swagger-output.json'),
        path.join(__dirname, 'swagger', 'swagger-output.json')
    ];
    const found = possible.find(p => fs.existsSync(p));
    if (found) {
        const swaggerDocument = require(found);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } else {
        console.warn('Swagger JSON not found; /api-docs disabled');
    }
} catch (err) {
    console.warn('swagger-ui-express not installed or failed to load; /api-docs disabled');
}

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, './frontend/')));

// Routes simples pour le frontend
app.get('/home', (req, res) => {
  res.send('Hello World, This is home router');
});

app.get('/profile', (req, res) => {
  res.send('Hello World, This is profile router');
});

app.get('/login', (req, res) => {
  res.send('Hello World, This is login router');
});

app.get('/logout', (req, res) => {
  res.send('Hello World, This is logout router');
}); 


// Swagger Docs
swaggerDocs(app);

// Route racine - sert le fichier HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(` Frontend server running on http://localhost:${port}`);
  console.log(` Serving static files from: ${__dirname}`);
});