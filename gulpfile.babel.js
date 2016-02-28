import gulp from 'gulp'
import browserSync from 'browser-sync'
import watch from 'gulp-watch'
import githubPages from 'gulp-gh-pages'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import gutil from 'gulp-util'
import browserify from 'browserify'
import babelify from 'babelify'
import babel from 'gulp-babel'
import runSequence from 'run-sequence'
import del from 'del'

gulp.task('clean', () => {
  return del(['dist'])
})

gulp.task('prepublish', (callback) => {
  runSequence('clean', ['compile'], 'publish-github-pages', callback)
})

gulp.task('compile', () => {
  return gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('publish-github-pages', ['compile-example'], () => {
  return gulp
    .src('./example/**/*')
    .pipe(githubPages())
})

gulp.task('compile-example', () => {
  const bundler = browserify({
    entries: [
      'example/index.js'
    ],
    debug: true,
    transform: [babelify]
  })

  return bundler
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .on('error', gutil.log)
    .pipe(gulp.dest('example'))
})

gulp.task('watch', ['compile-example', 'server'], () => {
  watch([
    'src/**.js',
    'index.js',
    'examples/**/*.js',
    '!examples/**/bundle.js'
  ], () => {
    gulp.start('compile-example')
  })

  watch([
    'examples/**/bundle.js'
  ], () => {
    browserSync.reload()
  })
})

gulp.task('server', ['compile-example'], (callback) => {
  browserSync.init({
    server: {
      baseDir: './example'
    }
  }, callback)
})
