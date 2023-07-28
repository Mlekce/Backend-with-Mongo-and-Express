const db = require("../data/database");

class Comment {
  static async createComment(comment) {
    return await db
      .getDb()
      .collection("comments")
      .insertOne(comment);
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
