const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class SalaryService {
  constructor(usersService) {
    this._pool = new Pool();
    this._usersService = usersService;
  }

  async addSalaryForEmployee(adminId, owner, salary, role) {
    this._usersService.checkIsAdmin(adminId);

    const salary_id = `sal-${nanoid(10)}`;

    const query = {
      text: `INSERT INTO salary (salary_id, salary, owner, role)
        VALUES ($1, $2, $3, $4) RETURNING id`,
      values: [salary_id, salary, owner, role],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to add new salary');
    }

    return result.rows[0].id;
  }
}

module.exports = SalaryService;
