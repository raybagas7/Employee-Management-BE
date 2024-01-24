/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('attendance', {
    attend_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    status: {
      type: 'attendance_type',
      notNull: true,
    },
    date_log: {
      type: 'TIMESTAMP',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('attendance');
};
