const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

const InvariantError = require('../../exceptions/InvariantError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

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

  async checkIsAdmin(username) {
    const query = {
      text: 'SELECT is_admin from users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      const isAdmid = result.rows[0].is_admin;

      if (!isAdmid) {
        throw new AuthorizationError('Only admin that permitted to this route');
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
      text: `INSERT INTO users (user_id, username, password, email, fullname, profile_img, birth_date, mobile_phone, place_of_birth, gender, marital_status, is_admin)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING user_id`,
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

    return result.rows[0].user_id;
  }
}

module.exports = UsersService;
