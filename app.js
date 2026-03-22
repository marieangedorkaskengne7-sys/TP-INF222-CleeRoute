const express = require('express');
const swaggerUi = require('swagger-ui-express');
const articleRoutes = require('./routes/articleRoutes');
const swaggerDocument = require('./docs/swagger');
require('./config/db');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: "Bienvenue sur l'API Blog INF222",
    documentation: "http://localhost:3000/api-docs"
  });
});

app.use('/api/articles', articleRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée." });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
});
