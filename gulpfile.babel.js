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
import combiner from 'stream-combiner2'

function getCombinerPipe (tasks) {
  const combined = combiner.obj(tasks)
  combined.on('error', function ({ message }) {
    gutil.log(gutil.colors.red('Error'), message)
    this.emit('end')
  })

  return combined
}

gulp.task('clean', () => {
  return del(['dist'])
})

gulp.task('prepublish', (callback) => {
  runSequence('clean', ['compile'], 'publish-github-pages', callback)
})

gulp.task('compile', () => {
  return getCombinerPipe(
    gulp.src('src/**/*.js'),
    babel(),
    gulp.dest('dist')
  )
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

  return getCombinerPipe(
    bundler.bundle(),
    source('bundle.js'),
    buffer(),
    gulp.dest('example')
  )
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
