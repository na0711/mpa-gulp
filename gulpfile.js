const gulp = require("gulp");
const watch = require('gulp-watch');
const glob = require('glob');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const colors = {
  black : '\u001b[30m',
  red   : '\u001b[31m',
  green : '\u001b[32m',
  yellow: '\u001b[33m',
  reset : '\u001b[0m',
}
const jsDir = {
  module:'./static/modules/**/*.ts',
  page:'./static/page/**/*.ts',
  dist:'./dist/',
}

const tsProject = ts.createProject({
  declaration: true
});

glob(jsDir.page,  function (er, files) {
  const fileNames = files.map((file)=>{
    return file.split("/").pop();
  });
  console.log(files);
  console.log(fileNames);

  watch(jsDir.page, () => {
    // v1
    // files.forEach((file)=>{
    //   return gulp.src(file).pipe(tsProject()).pipe(gulp.dest(jsDir.dist));
    // });

    // 2
    // const transpile = new Promise((resolve, reject)=>(file)=>{
    //   return resolve(gulp.src(file).pipe(tsProject()).pipe(gulp.dest(jsDir.dist)));
    // });

    //v 3
    console.log(colors.green + "compile start -------" + colors.reset);
    files.forEach((file, i)=>{
      gulp.src(file)
          .pipe(concat(fileNames[i]))
          .pipe(ts({
              noImplicitAny: true,
              moduleResolution: 'node'
          }))
          .pipe(uglify())
          .pipe(gulp.dest(jsDir.dist))
    });
  });
});

glob(jsDir.module,  function (er, files) {
  const fileNames = files.map((file)=>{
    return file.split("/").pop();
  });
  console.log(files);
  console.log(fileNames);
  watch(`${__dirname}/*.html`, () => {

  });
});


gulp.task('pc:watch', () => {
  watch(`${__dirname}/*.html`, () => {
    // console.log(list);
    // return gulp.start('pc:sass')
  });
});

// style.scssをタスクを作成する
gulp.task("pc",  gulp.task('pc:watch'));
gulp.task("default",  gulp.parallel('pc'));