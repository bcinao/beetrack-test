var gulp = require('gulp')
var webserver = require('gulp-webserver')
var stylus = require('gulp-stylus')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var nib = require('nib')
var minify = require('gulp-minify-css')

gulp.task('stylus', function() {
  gulp.src('./src/styles/style.styl')
    .pipe(stylus({
      use: nib(),
      'include css': true,
    }))
    .pipe(minify())
    .pipe(gulp.dest('./public/'))
})

gulp.task('build', function() {
  browserify({
    ignore: ['reactstrap-tether'],
    entries: './src/js/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify.configure({
    presets: ["es2015", "react"]
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public/'))
})

gulp.task('watch', function() {
  gulp.watch(['./src/styles/**/*.styl', './src/components/**/*.styl'], ['stylus'])
})

gulp.task('default', ['stylus', 'build'])
