const Comment = require("../models/comments-model");
const mongodb = require("mongodb");
let ObjectId = mongodb.ObjectId;

async function fetchComments(req, res) {
  const id = new ObjectId(req.params.id);
  const comments = await Comment.fetchComments(id);
  res.json(comments);
}

async function postComments(req, res) {
  const title = req.body.title;
  const text = req.body.text;
  const id = new ObjectId(req.params.id);
  await Comment.createComment(title, text, id);
  res.json({ message: "comment added" });
}

module.exports = {
  fetchComments: fetchComments,
  postComments: postComments,
};
