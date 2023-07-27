const db = require("../data/database");

class Post {
  constructor(title, summary, authorId, authorName, content) {
    this.title = title;
    this.summary = summary;
    this.author = { authorId, authorName };
    this.content = content;
  }

  async createPost() {
    return await db.getDb().collection("posts").insertOne({
      title: this.title,
      summary: this.summary,
      author: this.author,
      date: new Date().toLocaleString(),
      content: this.content,
    });
  }

  static async deletePost(id) {
    return await db.getDb().collection("posts").deleteOne({ _id: id });
  }

  static async updatePost(id, title, summary, content) {
    return await db
      .getDb()
      .collection("posts")
      .updateOne(
        { _id: id },
        {
          $set: {
            title: title,
            summary: summary,
            date: new Date().toLocaleString(),
            content: content,
          },
        }
      );
  }

  static async findSingePost(id) {
    return await db.getDb().collection("posts").findOne({ _id: id });
  }

  static async findPostsAuthor(authorId) {
    return await db.getDb().collection("posts").find({ "author.authorId": authorId }).toArray();
  }

  static async findAllPosts(){
    return await db.getDb().collection("posts").find().toArray()
  }
}

module.exports = Post;
