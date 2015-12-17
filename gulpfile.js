'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var babelify = require("babelify");
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var server = require('gulp-express');

var scripts = [
  './app/dashboard.js'
];

gulp.task('server', function () {
    server.run(['server.js']);
    gulp.watch(['build/**/*.*'], server.notify);
});

gulp.task('html', function () {
  gulp.src('./app/index.html',{base: './app'})
    .pipe(gulp.dest('./build/'));
  gulp.src('./app/views/**/*.html',{base: './app'})
    .pipe(gulp.dest('./build/'));
});

gulp.task('browserify', function () {
  gulp.src(scripts, {entry: true})
    .pipe(browserify({
      transform: ['babelify']
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('sass', function () {
  gulp.src('./app/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.html', ['frontEnd']);
  gulp.watch('app/**/*.scss', ['frontEnd']);
  gulp.watch('app/**/*.js', ['frontEnd']);
});

gulp.task('frontEnd', ['browserify', 'sass', 'html']);
gulp.task('default', ['browserify', 'sass', 'html', 'watch', 'server']);
