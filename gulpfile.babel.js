import gulp from 'gulp'
import browserSync from 'browser-sync'
import watch from 'gulp-watch'
import githubPages from 'gulp-gh-pages'
import source from 'vinyl-source-stream'
import gutil from 'gulp-util'
import browserify from 'browserify'
import babelify from 'babelify'
import babel from 'gulp-babel'
import runSequence from 'run-sequence'
import del from 'del'
import combiner from 'stream-combiner2'
import watchify from 'watchify'
import sass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import sourcemaps from 'gulp-sourcemaps'
import buffer from 'vinyl-buffer'
import autoprefixer from 'gulp-autoprefixer'

function getPipe (tasks) {
  let combined = combiner.obj(tasks)

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
  runSequence('clean', ['compile'], callback)
})

gulp.task('compile', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('publish-github-pages', ['compile-example:styles', 'compile-example:scripts'], () => {
  return gulp
    .src('example/**/*')
    .pipe(githubPages())
})

const bundler = watchify(browserify({
  ...watchify.args,
  entries: ['./example/scripts/index.js'],
  debug: true,
  transform: [babelify]
}))

function bundle () {
  return bundler.bundle()
    .on('error', function ({ message }) {
      gutil.log(gutil.colors.red('Error'), message)
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./example'))
}

gulp.task('compile-example:styles', () => {
  return getPipe([
    gulp.src('./example/styles/app.scss'),
    sourcemaps.init(),
    sassGlob(),
    sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError),
    autoprefixer({
      browsers: ['last 2 versions'],
      cascade: true
    }),
    sourcemaps.write('./'),
    gulp.dest('./example'),
    browserSync.stream()
  ])
})

gulp.task('compile-example:scripts', bundle)

bundler.on('update', bundle)
bundler.on('log', gutil.log)

gulp.task('watch', ['compile-example:styles', 'compile-example:scripts', 'server'], () => {
  watch([
    'src/**.js',
    'index.js',
    'example/scripts/**/*.js'
  ], () => {
    gulp.start('compile-example:scripts')
  })

  watch([
    'example/styles/**/*.scss'
  ], () => {
    gulp.start('compile-example:styles')
  })

  watch([
    'example/*.html',
    'example/app.js'
  ], () => {
    browserSync.reload()
  })
})

gulp.task('server', (callback) => {
  browserSync.init({
    server: {
      baseDir: './example'
    }
  }, callback)
})
