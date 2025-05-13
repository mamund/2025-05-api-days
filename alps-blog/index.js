// Generated Node.js API from ALPS for blog management
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3010;

app.use(bodyParser.json());

let articles = [
  { id: "1", title: "Welcome", content: "First post", publicationDate: "2025-05-01", tag: "intro", author: "Admin" }
];
let comments = [
  { id: "1", articleId: "1", commentContent: "Great post!", commenter: "Reader" }
];

function makeArticleResponse(article) {
  return {
    ...article,
    _links: {
      self: { href: `/articles/${article.id}` },
      update: { href: `/articles/${article.id}`, method: "PUT", args: ["title", "content", "publicationDate", "tag", "author"] },
      publish: { href: `/articles/${article.id}/publish`, method: "PUT" },
      delete: { href: `/articles/${article.id}`, method: "DELETE" }
    }
  };
}

function makeCommentResponse(comment) {
  return {
    ...comment,
    _links: {
      self: { href: `/comments/${comment.id}` },
      delete: { href: `/comments/${comment.id}`, method: "DELETE" }
    }
  };
}

app.get('/', (req, res) => {
  res.json({
    _links: {
      articles: { href: "/articles" },
      comments: { href: "/comments" }
    }
  });
});

// Articles
app.get('/articles', (req, res) => {
  const { tag, author } = req.query;
  let filtered = articles;
  if (tag) filtered = filtered.filter(a => a.tag === tag);
  if (author) filtered = filtered.filter(a => a.author === author);
  res.json({
    items: filtered.map(makeArticleResponse),
    _links: {
      self: { href: "/articles" },
      create: { href: "/articles", method: "POST", args: ["title", "content", "publicationDate", "tag", "author"] },
      filterByTag: { href: "/articles?tag=TAG" },
      filterByAuthor: { href: "/articles?author=AUTHOR" }
    }
  });
});

app.get('/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === req.params.id);
  res.json(article ? makeArticleResponse(article) : {});
});

app.post('/articles', (req, res) => {
  const newArticle = { id: String(Date.now()), ...req.body };
  articles.push(newArticle);
  res.status(201).json(makeArticleResponse(newArticle));
});

app.put('/articles/:id', (req, res) => {
  articles = articles.map(a => a.id === req.params.id ? { ...a, ...req.body } : a);
  const updated = articles.find(a => a.id === req.params.id);
  res.json(makeArticleResponse(updated));
});

app.put('/articles/:id/publish', (req, res) => {
  articles = articles.map(a => a.id === req.params.id ? { ...a, published: true } : a);
  const published = articles.find(a => a.id === req.params.id);
  res.json(makeArticleResponse(published));
});

app.delete('/articles/:id', (req, res) => {
  articles = articles.filter(a => a.id !== req.params.id);
  res.status(204).end();
});

// Comments
app.get('/comments', (req, res) => {
  res.json({
    items: comments.map(makeCommentResponse),
    _links: {
      self: { href: "/comments" },
      create: { href: "/comments", method: "POST", args: ["articleId", "commentContent", "commenter"] }
    }
  });
});

app.post('/comments', (req, res) => {
  const newComment = { id: String(Date.now()), ...req.body };
  comments.push(newComment);
  res.status(201).json(makeCommentResponse(newComment));
});

app.delete('/comments/:id', (req, res) => {
  comments = comments.filter(c => c.id !== req.params.id);
  res.status(204).end();
});

app.listen(port, () => console.log(`Blog API running at http://localhost:${port}`));

