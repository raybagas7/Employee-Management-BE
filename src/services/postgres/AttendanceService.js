const { Pool } = require('pg');
const { DateTime } = require('luxon');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class AttendanceService {
  constructor() {
    this._pool = new Pool();
  }

  async checkUserHasChecIn(owner) {
    const query = {
      text: `SELECT date_log FROM attendance
      WHERE owner = $1 AND status = 'in'
      ORDER BY date_log DESC
      LIMIT 1`,
      values: [owner],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      const lastDateAttendance = result.rows[0].date_log;
      const currentIndoTime = DateTime.now().setZone('Asia/Jakarta');
      const isSameDay = currentIndoTime.hasSame(lastDateAttendance, 'day');
      if (isSameDay) {
        return true;
      } else {
        return false;
      }
    }
  }

  async checkInSameDay(owner) {
    const query = {
      text: `SELECT date_log FROM attendance
      WHERE owner = $1 AND status = 'in'
      ORDER BY date_log DESC
      LIMIT 1`,
      values: [owner],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      const lastDateAttendance = result.rows[0].date_log;
      const currentIndoTime = DateTime.now().setZone('Asia/Jakarta');
      const isSameDay = currentIndoTime.hasSame(lastDateAttendance, 'day');
      if (isSameDay) {
        throw new InvariantError(
          `Your 'in' attendance for today has already been recorded`
        );
      }
    }
  }

  async checkOutSameDay(owner) {
    const checkIn = await this.checkUserHasChecIn(owner);

    if (checkIn) {
      const query = {
        text: `SELECT date_log FROM attendance
      WHERE owner = $1 AND status = 'out'
      ORDER BY date_log DESC
      LIMIT 1`,
        values: [owner],
      };

      const result = await this._pool.query(query);

      if (result.rows.length > 0) {
        const lastDateAttendance = result.rows[0].date_log;
        const currentIndoTime = DateTime.now().setZone('Asia/Jakarta');
        const isSameDay = currentIndoTime.hasSame(lastDateAttendance, 'day');
        if (isSameDay) {
          throw new InvariantError(
            `Your 'out' attendance for today has already been recorded`
          );
        }
      }
    } else {
      throw new InvariantError('You need to check in first for today');
    }
  }

  async postEmployeeAttendance(owner, status) {
    let currentIndoTime = DateTime.now().setZone('Asia/Jakarta');

    if (status === 'in') {
      await this.checkInSameDay(owner);
    }

    if (status === 'out') {
      await this.checkOutSameDay(owner);
    }

    const attendId = `atd-${nanoid(10)}`;

    const query = {
      text: `INSERT INTO attendance (attend_id, status, date_log, owner)
        VALUES ($1, $2, $3, $4) RETURNING attend_id`,
      values: [attendId, status, currentIndoTime, owner],
    };

    await this._pool.query(query);
  }
}

module.exports = AttendanceService;
