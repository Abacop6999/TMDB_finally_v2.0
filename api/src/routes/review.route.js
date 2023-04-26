import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get("/", tokenMiddleware.auth, reviewController.getReviewsOfUser);

router.post(
  "/",
  tokenMiddleware.auth,
  body("mediaId")
    .exists()
    .withMessage("Se requiere mediaId")
    .isLength({ min: 1 })
    .withMessage("mediaId no puede estar vacío"),
  body("content")
    .exists()
    .withMessage("Se requiere contenido")
    .isLength({ min: 1 })
    .withMessage("El contenido no puede estar vacío"),
  body("mediaType")
    .exists()
    .withMessage("Se requiere mediaType")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType inválido"),
  body("mediaTitle").exists().withMessage("Se requiere mediaTitle"),
  body("mediaPoster").exists().withMessage("Se requiere mediaPoster"),
  requestHandler.validate,
  reviewController.create
);

router.delete("/:reviewId", tokenMiddleware.auth, reviewController.remove);

export default router;
