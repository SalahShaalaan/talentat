import express from "express"
import { getNavs, updateNavs, trackNavsChange } from "../controllers/navs.controller.js"
const router = express.Router()

router.route("/")
  .get(getNavs)
  .post(updateNavs)

router.route("/track")
  .post(trackNavsChange)

export default router