var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    version = require('./version'),
    config = require('./config')

var paths = {
    scripts: ['./client/js/*.js'],
    tests: './test/*.js'
}

gulp.task('browserify', function() {
    return browserify('./client/js/app.js')
        .bundle()
        .pipe(source('simple-cart-' + version + '.min.js')) // gives streaming vinyl file object
        .pipe(buffer()) // convert from streaming to buffered vinyl file object
        .pipe(gulpif(!config.debug, uglify())) // only gulp-uglify if not debug mode
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
