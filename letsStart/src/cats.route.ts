import * as catService from "./cats.service";
import { Router } from 'express';

const router = Router();

router.get('/cats', catService.readAllCats);

router.get('/cats/:id', catService.readCat);

router.post('/cats', catService.CreateCat);

router.put('/cats/:id', catService.updateCatAll);

router.patch('/cats/:id', catService.updateCatPartial);

router.delete('/cats/:id', catService.deleteCat);

export default router;