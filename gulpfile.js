/*eslint-disable */
var gulp = require('gulp-npm-run')(require('gulp'));
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');

gulp.task('server', function (callback) {
  browserSync.init({
    server: {
      baseDir: './examples'
    }
  }, callback);
});

gulp.task('watch', ['compile', 'server'], function () {
  watch([
    'src/**.js',
    'index.js',
    'examples/**/*.js',
    '!examples/**/bundle.js'
  ], function () {
    gulp.start('compile-examples');
  });

  watch([
    'examples/**/bundle.js'
  ], function () {
    browserSync.reload();
  });
});
/*eslint-enable */
