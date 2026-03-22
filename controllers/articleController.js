const ArticleModel = require('../models/articleModel');

const validateArticleCreation = ({ titre, contenu, auteur, date, categorie }) => {
  if (!titre || titre.trim() === '') {
    return "Le titre est obligatoire.";
  }
  if (!contenu || contenu.trim() === '') {
    return "Le contenu est obligatoire.";
  }
  if (!auteur || auteur.trim() === '') {
    return "L'auteur est obligatoire.";
  }
  if (!date || date.trim() === '') {
    return "La date est obligatoire.";
  }
  if (!categorie || categorie.trim() === '') {
    return "La catégorie est obligatoire.";
  }
  return null;
};

const validateArticleUpdate = ({ titre, contenu, categorie }) => {
  if (!titre || titre.trim() === '') {
    return "Le titre est obligatoire.";
  }
  if (!contenu || contenu.trim() === '') {
    return "Le contenu est obligatoire.";
  }
  if (!categorie || categorie.trim() === '') {
    return "La catégorie est obligatoire.";
  }
  return null;
};

exports.createArticle = (req, res) => {
  const error = validateArticleCreation(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  ArticleModel.create(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erreur serveur lors de la création de l'article.", error: err.message });
    }

    return res.status(201).json({
      message: "Article créé avec succès.",
      id: result.id
    });
  });
};

exports.getAllArticles = (req, res) => {
  const filters = {
    categorie: req.query.categorie,
    auteur: req.query.auteur,
    date: req.query.date
  };

  ArticleModel.getAll(filters, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Erreur serveur lors de la récupération des articles.", error: err.message });
    }

    return res.status(200).json(rows);
  });
};

exports.getArticleById = (req, res) => {
  const { id } = req.params;

  ArticleModel.getById(id, (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Erreur serveur lors de la récupération de l'article.", error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    return res.status(200).json(row);
  });
};

exports.updateArticle = (req, res) => {
  const { id } = req.params;
  const error = validateArticleUpdate(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  ArticleModel.update(id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erreur serveur lors de la mise à jour de l'article.", error: err.message });
    }

    if (result.changes === 0) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    return res.status(200).json({ message: "Article mis à jour avec succès." });
  });
};

exports.deleteArticle = (req, res) => {
  const { id } = req.params;

  ArticleModel.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erreur serveur lors de la suppression de l'article.", error: err.message });
    }

    if (result.changes === 0) {
      return res.status(404).json({ message: "Article non trouvé." });
    }

    return res.status(200).json({ message: "Article supprimé avec succès." });
  });
};

exports.searchArticles = (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === '') {
    return res.status(400).json({ message: "Le paramètre query est obligatoire." });
  }

  ArticleModel.search(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Erreur serveur lors de la recherche.", error: err.message });
    }

    return res.status(200).json(rows);
  });
};
