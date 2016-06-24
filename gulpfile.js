var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpConcat = require('gulp-concat'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

var templateCache = require('gulp-angular-templatecache');


gulp.task('set-dev-node-env', function () {
    return process.env.NODE_ENV = 'development';
});

// create a default task and just log a message
gulp.task('concat-main-app', function () {
    gulp.src('static-src/app/**/*.js')
        .pipe(gulpConcat('app-bundle.js'))
        .pipe(gulp.dest('static/')).pipe(livereload());
});

gulp.task('copy-app-templates', function () {
    gulp.src('static-src/app/**/*.html')
        .pipe(templateCache('templates.js', {root: '/static/app/', standalone: true}))
        .pipe(gulp.dest('static/')).pipe(livereload());
});


gulp.task('concat-apanel-app', function () {
    gulp.src('static-src/apanel/**/*.js')
        .pipe(gulpConcat('apanel-bundle.js'))
        .pipe(gulp.dest('static/')).pipe(livereload());
});

gulp.task('copy-apanel-templates', function () {
    gulp.src('static-src/apanel/**/*.html')
        .pipe(templateCache('apanel-templates.js', {root: '/static/apanel/', standalone: true}))
        .pipe(gulp.dest('static/')).pipe(livereload());
});

gulp.task('dev-env', function () {
    nodemon({
        script: 'app.js'
        , ext: 'js'
        , ignore: ['static/**/*', "static-src/**/*"]
        , env: {'NODE_ENV': 'development'}
    });
    livereload.listen();

    gulp.watch('static-src/app/**/*.{html,css}', ['copy-app-templates']);
    gulp.watch('static-src/apanel/**/*.{html,css}', ['copy-apanel-templates']);
    gulp.watch('static-src/app/**/*.js', ['concat-main-app']);
    gulp.watch('static-src/apanel/**/*.js', ['concat-apanel-app']);
});

gulp.task('build-dev', ['concat-main-app', 'concat-apanel-app', 'copy-app-templates', 'copy-apanel-templates']);