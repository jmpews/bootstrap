// Basic Gulp File
//
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass')
    rename = require('gulp-rename')
    autoprefix = require('gulp-autoprefixer')
    notify = require("gulp-notify")
    bower = require('gulp-bower');

var config = {
    sassPath: './scss',
    bowerDir: './bower_components'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('css', function() {
        return sass('scss/*.scss', {
            style: 'compressed',
            loadPath: [
                config.bowerDir + '/font-awesome/scss',
                config.sassPath
            ]
        })
        .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            }))
        .pipe(autoprefix('last 2 version', 'Safari 5', 'IE 8', 'IE 9', 'Opera 12.1',     'IOS 6', 'android 4'))
        .pipe(gulp.dest('./public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/*.scss', ['css']);
});

gulp.task('default', ['bower', 'icons', 'css']);
