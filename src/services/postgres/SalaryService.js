const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SalaryService {
  constructor(usersService) {
    this._pool = new Pool();
    this._usersService = usersService;
  }

  async checkSalaryAvailability(owner) {
    const query = {
      text: 'SELECT owner from salary WHERE owner = $1',
      values: [owner],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError(
        `Failed to add a new employee, salary for this account is already registered`
      );
    }
  }

  async addSalaryForEmployee(adminId, owner, salary, role) {
    await this._usersService.checkIsAdmin(adminId);
    await this.checkSalaryAvailability(owner);

    const salary_id = `sal-${nanoid(10)}`;

    const query = {
      text: `INSERT INTO salary (salary_id, salary, owner, role)
        VALUES ($1, $2, $3, $4)`,
      values: [salary_id, salary, owner, role],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to add new salary');
    }
  }

  async updateSalaryOrRoleForEmployee(adminId, payload) {
    await this._usersService.checkIsAdmin(adminId);

    let updatedColumn = {};

    if (payload.salary) {
      updatedColumn['salary'] = payload.salary;
    }

    if (payload.role) {
      updatedColumn['role'] = payload.role;
    }

    const setClause = Object.keys(updatedColumn)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const values = [payload.owner, ...Object.values(updatedColumn)];

    const query = {
      text: `UPDATE salary SET ${setClause} WHERE owner = $1`,
      values,
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to update salary or role employee');
    }
  }

  async deleteSalary(adminId, owner) {
    await this._usersService.checkIsAdmin(adminId);

    const query = {
      text: 'DELETE FROM salary WHERE owner = $1 RETURNING salary_id',
      values: [owner],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Salary id not found');
    }
  }
}

module.exports = SalaryService;
