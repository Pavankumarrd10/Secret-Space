import { Router } from 'express';
import { ConfessionController } from '../controllers/confessionController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();
const controller = new ConfessionController();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:id', authenticateAdmin, controller.delete);

export default router;