/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint(
    'salary',
    'fk_salary.owner_users.user_id',
    'FOREIGN KEY(owner) REFERENCES users(user_id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('salary', 'fk_salary.owner_users.user_id');
};
