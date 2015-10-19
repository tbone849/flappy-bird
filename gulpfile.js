var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var neat = require('node-neat');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var minifyCss = require('gulp-minify-css');

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Watch task
gulp.task('watch', ['build'], function() {
  gulp.watch('index.html', ['build'] );
  gulp.watch('js/*.js', ['build']);
  gulp.watch('scss/*.scss', ['build']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

// Minify index
gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function() {
  gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

gulp.task('vendor', function() {
  gulp.src('js/vendor/*')
    .pipe(gulp.dest('build/js/vendor'));
});

// Build task
gulp.task('build', ['jshint', 'styles', 'scripts', 'html', 'images', 'vendor']);