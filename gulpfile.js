'use strict';

const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const rimraf = require('gulp-rimraf');
const header = require('gulp-header');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const pkg = require('./package.json');

gulp.task('build.clean', () => {
  return gulp.src('dist', { read: false })
    .pipe(rimraf());
});

gulp.task('build', ['build.clean'], () => {
  return gulp.src('less/index.less')
    .pipe(less())
    .pipe(header([
      '/*!',
      '* <%= pkg.name %>',
      '* <%= pkg.homepage %>',
      '*',
      '* Copyright attrs and others',
      '* Released under the MIT license',
      '* https://github.com/<%=pkg.repository%>/blob/master/LICENSE',
      '*/',
      ''
    ].join('\n'), { pkg: pkg }))
    .pipe(rename({
      basename: pkg.name
    }))
    .pipe(gulp.dest('dist'))
    .pipe(cssmin())
    .pipe(header('/*! <%= pkg.name %> - attrs */', { pkg: pkg }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

// conclusion
gulp.task('watch', ['build.watch']);
gulp.task('default', ['build']);
