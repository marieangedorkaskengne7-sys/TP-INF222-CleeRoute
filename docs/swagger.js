const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Blog INF222",
    version: "1.0.0",
    description: "Documentation Swagger de l'API backend de gestion des articles de blog"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Serveur local"
    }
  ],
  paths: {
    "/api/articles": {
      get: {
        summary: "Récupérer tous les articles",
        parameters: [
          {
            name: "categorie",
            in: "query",
            schema: { type: "string" },
            required: false
          },
          {
            name: "auteur",
            in: "query",
            schema: { type: "string" },
            required: false
          },
          {
            name: "date",
            in: "query",
            schema: { type: "string" },
            required: false
          }
        ],
        responses: {
          200: {
            description: "Liste des articles"
          }
        }
      },
      post: {
        summary: "Créer un article",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["titre", "contenu", "auteur", "date", "categorie"],
                properties: {
                  titre: { type: "string", example: "Mon premier article" },
                  contenu: { type: "string", example: "Contenu de l'article..." },
                  auteur: { type: "string", example: "Jean" },
                  date: { type: "string", example: "2026-03-22" },
                  categorie: { type: "string", example: "Tech" },
                  tags: { type: "string", example: "nodejs,express,api" }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Article créé avec succès"
          },
          400: {
            description: "Données invalides"
          }
        }
      }
    },
    "/api/articles/{id}": {
      get: {
        summary: "Récupérer un article par son ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Article trouvé" },
          404: { description: "Article non trouvé" }
        }
      },
      put: {
        summary: "Mettre à jour un article",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["titre", "contenu", "categorie"],
                properties: {
                  titre: { type: "string", example: "Titre modifié" },
                  contenu: { type: "string", example: "Nouveau contenu" },
                  categorie: { type: "string", example: "Backend" },
                  tags: { type: "string", example: "update,nodejs" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Article mis à jour" },
          404: { description: "Article non trouvé" }
        }
      },
      delete: {
        summary: "Supprimer un article",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Article supprimé" },
          404: { description: "Article non trouvé" }
        }
      }
    },
    "/api/articles/search": {
      get: {
        summary: "Rechercher un article par texte",
        parameters: [
          {
            name: "query",
            in: "query",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          200: {
            description: "Résultats trouvés"
          },
          400: {
            description: "Paramètre query manquant"
          }
        }
      }
    }
  }
};

module.exports = swaggerDocument;
