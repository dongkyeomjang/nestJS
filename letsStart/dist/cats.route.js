"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var catService = require("./cats.service");
var express_1 = require("express");
var router = express_1.Router();
router.get('/cats', catService.readAllCats);
router.get('/cats/:id', catService.readCat);
router.post('/cats', catService.CreateCat);
router.put('/cats/:id', catService.updateCatAll);
router.patch('/cats/:id', catService.updateCatPartial);
router.delete('/cats/:id', catService.deleteCat);
exports.default = router;
//# sourceMappingURL=cats.route.js.map