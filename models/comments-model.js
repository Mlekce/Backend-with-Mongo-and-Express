const db = require("../data/database");

class Comment {
  static async createComment(title, text, postId) {
    return await db
      .getDb()
      .collection("comments")
      .insertOne({ title: title, text: text, postId: postId });
  }

  static async fetchComments(id) {
    return await db
      .getDb()
      .collection("comments")
      .find({ postId: id })
      .toArray();
  }
}

module.exports = Comment;
