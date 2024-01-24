/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('salary', {
    salary_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    salary: {
      type: 'INT',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('salary');
};
