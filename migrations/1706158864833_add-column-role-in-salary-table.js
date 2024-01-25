/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addColumn('salary', {
    role: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('salary', 'role');
};
