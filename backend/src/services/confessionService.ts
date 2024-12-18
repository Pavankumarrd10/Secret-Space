import { pool } from '../config/database';
import type { Confession } from '../types';

export class ConfessionService {
  async getAll(): Promise<Confession[]> {
    const result = await pool.query(
      'SELECT * FROM confessions ORDER BY timestamp DESC'
    );
    return result.rows;
  }

  async create(content: string): Promise<Confession> {
    const result = await pool.query(
      'INSERT INTO confessions (content, user_id) VALUES ($1, $2) RETURNING *',
      [content, crypto.randomUUID()]
    );
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    await pool.query('DELETE FROM confessions WHERE id = $1', [id]);
  }
}