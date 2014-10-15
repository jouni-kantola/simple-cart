var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var version = require('./version');

var paths = {
    scripts: ['./client/js/*.js'],
    tests: './test/*.js'
}

gulp.task('browserify', function() {
  return browserify('./client/js/app.js')
    .bundle()
    .pipe(source('simple-cart-' + version + '.min.js')) // gives streaming vinyl file object
    .pipe(buffer()) // convert from streaming to buffered vinyl file object
    .pipe(uglify()) // gulp-uglify 
    .pipe(gulp.dest('./client/build'));
})

// Define tests
gulp.task('tests', function() {})

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['browserify']);
    gulp.watch(paths.tests, ['tests']);
})

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify', 'tests', 'watch'])
