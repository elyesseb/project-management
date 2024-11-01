import { Router, RequestHandler } from 'express';
import {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController';

const router = Router();

router.post('/', addCategory as RequestHandler);

router.get('/', getAllCategories as RequestHandler);

router.put('/:id', updateCategory as RequestHandler);

router.delete('/:id', deleteCategory as RequestHandler);

export default router;