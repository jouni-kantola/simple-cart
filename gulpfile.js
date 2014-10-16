var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    minifyCSS = require('gulp-minify-css'),
    mocha = require('gulp-mocha'),
    version = require('./version'),
    config = require('./config')

var paths = {
    scripts: {
        server: './server/**/*.js',
        client: './client/js/**/*.js'
    },
    tests: {
        server: './test/server/*.js',
        client: './test/client/*.js'
    },
    styles: './client/styles/*.css'
}

gulp.task('browserify', function() {
    return browserify('./client/js/app.js')
        .bundle()
        .pipe(source('simple-cart-' + version + '.min.js')) // gives streaming vinyl file object
        .pipe(buffer()) // convert from streaming to buffered vinyl file object
        .pipe(gulpif(!config.debug, uglify())) // only gulp-uglify if not debug mode
        .pipe(gulp.dest('./client/build'));
})

gulp.task('styles', function() {
    gulp.src(paths.styles)
        .pipe(minifyCSS({
            keepBreaks: config.debug
        }))
        .pipe(gulp.dest('./client/build'))
})


gulp.task('server-tests', function() {
    return gulp.src(paths.tests.server, {
            read: false
        })
        .pipe(mocha({
            reporter: 'min'
        }))
})

gulp.task('client-tests', function() {
    return gulp.src(paths.tests.client, {
            read: false
        })
        .pipe(mocha({
            reporter: 'min'
        }))
})

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts.client, ['browserify', 'client-tests']);
    gulp.watch(paths.tests.client, ['client-tests']);
    gulp.watch([paths.scripts.server, paths.tests.server], ['server-tests']);
})

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify', 'styles', 'server-tests', 'client-tests', 'watch'])
