const express = require("express");
const router = express.Router();

const protectRoute = require("../middlewares/protection");
const controller = require("../controllers/posts-control");

router.use(protectRoute);

router.get("/posts", controller.getPosts);

router.get("/myposts", controller.getMyPosts);

router.post("/myposts/create", controller.postCreate);

router.get("/post/:id/update", controller.updatePost);

router.post("/post/:id/update", controller.postUpdatePost);

router.post("/post/:id/delete", controller.deletePost);

router.get('/post/:id', controller.viewPost)

module.exports = router;
