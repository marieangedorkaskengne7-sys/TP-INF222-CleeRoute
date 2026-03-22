# API Backend de Gestion d’un Blog Simple – INF222 EC1 TAF1

 Auteur
- Nom et Prénom : KENGNE MARIE ANGE DORKAS
- Matricule : 23U2695
- Filière : Informatique
-UE : INF222 – EC1 (Développement Backend)

---

 Description du projet

Ce projet a été réalisé dans le cadre du **TAF1 de l’UE INF222 – Développement Backend**.  
Il s’agit d’une **API backend REST** permettant la gestion des articles d’un blog simple.

L’API permet les opérations principales suivantes :

- créer un article ;
- afficher tous les articles ;
- afficher un article spécifique ;
- modifier un article ;
- supprimer un article ;
- rechercher un article par mot-clé ;
- filtrer les articles par catégorie, auteur ou date.

Le projet a été développé avec :

- Node.js
- Express.js
- SQLite
- Swagger UI pour la documentation de l’API



 Objectifs du projet

Les objectifs principaux de ce travail sont :

- mettre en pratique les notions de développement backend ;
- concevoir une API REST fonctionnelle ;
- manipuler une base de données ;
- documenter une API avec Swagger ;
- structurer un projet Node.js selon une organisation claire ;
- respecter les bonnes pratiques de développement.



 Technologies utilisées

- Node.js
- Express.js
- SQLite3
- Swagger UI Express
- Nodemon(développement)



Structure du projet


blog-api/
├── app.js
├── package.json
├── blog.db
├── config/
│   └── db.js
├── controllers/
│   └── articleController.js
├── models/
│   └── articleModel.js
├── routes/
│   └── articleRoutes.js
├── docs/
│   └── swagger.js
└── README.md
