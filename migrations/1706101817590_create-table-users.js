/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    email: {
      type: 'TEXT',
      notNull: true,
    },
    fullname: {
      type: 'TEXT',
      notNull: true,
    },
    profile_img: {
      type: 'TEXT',
      notNull: true,
    },
    birth_date: {
      type: 'DATE',
      notNull: true,
    },
    mobile_phone: {
      type: 'TEXT',
      notNull: true,
    },
    place_of_birth: {
      type: 'TEXT',
      notNull: true,
    },
    gender: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    marital_status: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    is_admin: {
      type: 'BOOLEAN',
      default: 'false',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
