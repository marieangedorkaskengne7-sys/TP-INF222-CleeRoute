const db = require('../config/db');

const ArticleModel = {
  create: (article, callback) => {
    const { titre, contenu, auteur, date, categorie, tags } = article;
    const sql = `
      INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [titre, contenu, auteur, date, categorie, tags || ''], function (err) {
      callback(err, { id: this?.lastID });
    });
  },

  getAll: (filters, callback) => {
    let sql = `SELECT * FROM articles WHERE 1=1`;
    const params = [];

    if (filters.categorie) {
      sql += ` AND categorie = ?`;
      params.push(filters.categorie);
    }

    if (filters.auteur) {
      sql += ` AND auteur = ?`;
      params.push(filters.auteur);
    }

    if (filters.date) {
      sql += ` AND date = ?`;
      params.push(filters.date);
    }

    db.all(sql, params, callback);
  },

  getById: (id, callback) => {
    const sql = `SELECT * FROM articles WHERE id = ?`;
    db.get(sql, [id], callback);
  },

  update: (id, article, callback) => {
    const { titre, contenu, categorie, tags } = article;
    const sql = `
      UPDATE articles
      SET titre = ?, contenu = ?, categorie = ?, tags = ?
      WHERE id = ?
    `;
    db.run(sql, [titre, contenu, categorie, tags || '', id], function (err) {
      callback(err, { changes: this?.changes });
    });
  },

  delete: (id, callback) => {
    const sql = `DELETE FROM articles WHERE id = ?`;
    db.run(sql, [id], function (err) {
      callback(err, { changes: this?.changes });
    });
  },

  search: (query, callback) => {
    const sql = `
      SELECT * FROM articles
      WHERE titre LIKE ? OR contenu LIKE ?
    `;
    const searchValue = `%${query}%`;
    db.all(sql, [searchValue, searchValue], callback);
  }
};

module.exports = ArticleModel;
