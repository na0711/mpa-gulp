const gulp = require("gulp");
const fs = require('fs');
const glob = require('glob');
const watch = require('gulp-watch');

const jsDir = {
  module:'./static/module/**/*.js',
  page:'./static/page/**/*.js',
  dist:'./dist/',
}

const list = glob(jsDir.module,  function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
});

gulp.task('pc:watch', () => {
  watch(`${__dirname}/*.html`, () => {
    console.log(list);
    // return gulp.start('pc:sass')
  });
});

// style.scssをタスクを作成する
gulp.task("pc",  gulp.task('pc:watch'));
gulp.task("default",  gulp.parallel('pc'));