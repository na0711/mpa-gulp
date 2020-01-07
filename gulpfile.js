const gulp = require("gulp");
const watch = require('gulp-watch');
const glob = require('glob');
const del = require('del');
const ps = require('child_process').exec;
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const _webpackConfig = require('./webpack.config.js');

const jsDir = {
  module:'./static/modules/**/*.ts',
  page:'./static/pages/**/*.ts',
  dist:`${__dirname}/dist/`, // './dist/'ではabsoluteエラーになる
}

let pageFiles = [];
let fileNames = [];

// pageフォルダ内のtsファイルごとにエントリポイント登録するために glob内でwatchする
gulp.task('watch_page_ts', function() {
  glob(jsDir.page,  function (er, result) {
    pageFiles = result;
    // ファイル名だけを収集して拡張子を .js に変換
    fileNames = pageFiles.map((file)=>{
      return file.split("/").pop().replace(/\.ts$/,'.js');
    });
    pageFiles.forEach((file, i)=>{
      const webpackConfig = {
        ..._webpackConfig,
        entry:file,
        output:{
          path:jsDir.dist,
          filename:fileNames[i],
        }
      }
      watch(file, () => {
        return gulp.src(file).pipe(webpackStream(webpackConfig, webpack)).pipe(gulp.dest(jsDir.dist));
      });
    });
  });
});

gulp.task('compile_ts', (cb)=>{
  pageFiles.forEach((file, i)=>{
    const webpackConfig = {
      ..._webpackConfig,
      entry:file,
      output:{
        path:jsDir.dist,
        filename:fileNames[i],
      }
    }
    gulp.src(file).pipe(webpackStream(webpackConfig, webpack, cb)).pipe(gulp.dest(jsDir.dist));
  });
  cb();
});

// モジュールファイルを監視してcompile タスクを実行
gulp.task('watch_module_ts', () => {
  return gulp.watch(jsDir.module, gulp.parallel('compile_ts'));
})

// typescript のコンパイルに必要な.d.tsファイルを生成
gulp.task('type_refresh', function() {
  const command = "tsc --emitDeclarationOnly";
  del(['static/@types/**/*']);
  return ps(command , function (err, stdout, stderr) {});
});

gulp.task("default",  gulp.parallel('type_refresh','watch_page_ts','watch_module_ts'));