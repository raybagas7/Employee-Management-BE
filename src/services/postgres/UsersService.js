const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

const InvariantError = require('../../exceptions/InvariantError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async checkNewUsername(username, email) {
    const query = {
      text: 'SELECT username, email from users WHERE username = $1 OR email = $2',
      values: [username, email],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      const selectedEmail = result.rows[0].email;

      if (selectedEmail === email) {
        throw new InvariantError(`This email '${email} already registered`);
      }
    }

    if (result.rowCount > 0) {
      throw new InvariantError(
        `Failed to add a new employee, '${username}' is already registered`
      );
    }
  }

  async checkIsAdmin(id) {
    const query = {
      text: 'SELECT is_admin from users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      const isAdmid = result.rows[0].is_admin;

      if (!isAdmid) {
        throw new AuthorizationError('Only admin is permitted to this route');
      }
    }
  }

  async addNewUser({
    username,
    password,
    email,
    fullname,
    profile_img = 'https://firebasestorage.googleapis.com/v0/b/pokecard-agas.appspot.com/o/pokemon_element%2Fnormal.png?alt=media&token=1974e729-fae8-4ff4-bc9c-c9fc2fd434ff',
    birth_date,
    mobile_phone,
    place_of_birth,
    gender,
    marital_status,
    is_admin = false,
  }) {
    await this.checkNewUsername(username, email);

    const userId = `emp-${nanoid(10)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: `INSERT INTO users (id, username, password, email, fullname, profile_img, birth_date, mobile_phone, place_of_birth, gender, marital_status, is_admin)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
      values: [
        userId,
        username,
        hashedPassword,
        email,
        fullname,
        profile_img,
        birth_date,
        mobile_phone,
        place_of_birth,
        gender,
        marital_status,
        is_admin,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to add new employee');
    }

    return result.rows[0].id;
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1 ',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError(
        'The credentials you provide are in correct'
      );
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Wrong Password');
    }

    return id;
  }

  async updateUser(id, updatedFields) {
    const setClause = Object.keys(updatedFields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const values = [id, ...Object.values(updatedFields)];

    const query = {
      text: `UPDATE users SET ${setClause} WHERE id = $1 RETURNING id`,
      values,
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to update user data');
    }

    return result.rows[0].id;
  }

  async getAllEmployeeData() {
    const query = {
      text: `SELECT users.id, users.fullname, users.email, users.mobile_phone, users.place_of_birth, users.gender, users.marital_status, users.is_admin,
      salary.salary_id, salary.salary, salary.role
      FROM users
      LEFT JOIN salary 
      ON users.id = salary.owner`,
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('There is no any employee');
    }

    return result.rows;
  }

  async getEmployeeDetail(ownerId) {
    const query = {
      text: `SELECT users.id, users.username, users.fullname, users.email, users.mobile_phone, users.place_of_birth, users.gender, users.marital_status, users.is_admin,
      salary.salary_id, salary.salary, salary.role
      FROM users
      LEFT JOIN salary
      ON users.id = salary.owner
      WHERE users.id = $1`,
      values: [ownerId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Employee not exist');
    }

    return result.rows[0];
  }
}

module.exports = UsersService;
