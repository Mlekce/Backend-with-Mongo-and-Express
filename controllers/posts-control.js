const Post = require("../models/post-model");

async function getPosts(req, res) {
  const posts = await Post.findAllPosts();
  return res.render("blog", { posts: posts });
}

module.exports = {
    getPosts: getPosts
}