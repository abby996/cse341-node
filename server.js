const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

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

// Route racine - sert le fichier HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(` Frontend server running on http://localhost:${port}`);
  console.log(` Serving static files from: ${__dirname}`);
});