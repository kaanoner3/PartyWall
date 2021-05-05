import { Router } from "express";

// Export module for registering router in express app
const router: Router = Router();

// Define your routes here
router.get("/", (req, res) => {
  res.status(200).send({
    message: "GET request from sample router",
  });
});

router.post("/post", (req, res) => {
  res.status(200).send({
    message: "POST request from sample router",
  });
});

router.delete("/delete", (req, res) => {
  res.status(200).send({
    message: "DELETE request from sample router",
  });
});

module.exports = router;
