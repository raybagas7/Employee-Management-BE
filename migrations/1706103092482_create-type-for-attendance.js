/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createType('attendance_type', ['in', 'out']);
};

exports.down = (pgm) => {
  pgm.dropType('attendance_type');
};
