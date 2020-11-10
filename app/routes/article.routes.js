const { authJwt } = require("../middleware");

module.exports = app => {
  const articles = require("../controllers/article.controller.js");

  var router = require("express").Router();

  // Create a new article
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], articles.create);

  // Retrieve all articles
  router.get("/", articles.findAll);

  // Retrieve all published articles
  router.get("/published", articles.findAllPublished);

  // Retrieve a single article with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], articles.findOne);

  // Update a article with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], articles.update);

  // Delete a article with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], articles.delete);

  // Delete all articles
  router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], articles.deleteAll);

  app.use('/api/articles', router);
};