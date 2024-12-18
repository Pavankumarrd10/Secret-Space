import { Request, Response } from 'express';
import { ConfessionService } from '../services/confessionService';
import { validateConfession } from '../utils/validators';

export class ConfessionController {
  private service: ConfessionService;

  constructor() {
    this.service = new ConfessionService();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const confessions = await this.service.getAll();
      res.json(confessions);
    } catch (error) {
      console.error('Error getting confessions:', error);
      res.status(500).json({ error: 'Failed to get confessions' });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { content } = req.body;
      const validationError = validateConfession(content);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const confession = await this.service.create(content);
      res.status(201).json(confession);
    } catch (error) {
      console.error('Error creating confession:', error);
      res.status(500).json({ error: 'Failed to create confession' });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting confession:', error);
      res.status(500).json({ error: 'Failed to delete confession' });
    }
  };
}