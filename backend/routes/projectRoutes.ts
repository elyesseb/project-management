import { Router, RequestHandler } from 'express';
import {
    addProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectsByCategory,
    getUserProjects,
} from '../controllers/projectController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateUser, addProject as RequestHandler);

router.get('/', getAllProjects as RequestHandler);

router.get('/user', authenticateUser, getUserProjects as RequestHandler);

router.get('/filter', getProjectsByCategory as RequestHandler);

router.get('/:id', getProjectById as RequestHandler);

router.put('/:id', authenticateUser, updateProject as RequestHandler);

router.delete('/:id', authenticateUser, deleteProject as RequestHandler);

export default router;
