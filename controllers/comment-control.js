const Comment = require("../models/comments-model");
const mongodb = require("mongodb");
let ObjectId = mongodb.ObjectId;

async function fetchComments(req, res) {
  const id = new ObjectId(req.params.id);
  const comments = await Comment.fetchComments(id);
  res.json(comments);
}

async function postComments(req, res) {
  /*
  const title = req.body.title;
  const text = req.body.text;
  const id = new ObjectId(req.params.id);
  console.log(title, text, id)
  await Comment.createComment(title, text, id);
  return res.redirect('/')
  res.json({ message: "comment added" });
  */
  const postId = new ObjectId(req.params.id);
  const newComment = {
    postId: postId,
    title: req.body.title,
    text: req.body.text,
  };
  await Comment.createComment(newComment);
  res.json({ message: "comment added" });
}

module.exports = {
  fetchComments: fetchComments,
  postComments: postComments,
};
