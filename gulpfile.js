const
  gulp = require('gulp'),
  babel = require('gulp-babel'),
  plumber = require('gulp-plumber'),
  rimraf = require('gulp-rimraf'),
  less = require('gulp-less'),
  destdir = 'public_nodejs',
  fs = require('fs'),
  preset = {
    presets: ['@babel/env']
  }
;

/**
 * ALL OTHER REBUILDS
 */

gulp.task('rebuild', () => {
  return gulp.src(`src/**/*.js`)
    .pipe(plumber())
    .pipe(babel(preset))
    .pipe(gulp.dest(`${destdir}/`));
});

gulp.task('less', function () {
  return gulp.src(`src/public/**/*.less`)
    .pipe(less())
    .pipe(gulp.dest(`${destdir}/public/`));
});

gulp.task('rebuild-app', () => {
  return gulp.src([ `server.js`, `app.js` ])
    .pipe(plumber())
    .pipe(babel(preset))
    .pipe(gulp.dest(`${destdir}/`));
});

gulp.task('rebuild-views', () => {
  return gulp.src(`src/views/**/*.hbs`)
    .pipe(gulp.dest(`${destdir}/views/`));
});

gulp.task('rebuild-public', () => {
  return gulp.src([
    `src/public/**/*.css`
  ])
    .pipe(gulp.dest(`${destdir}/public/`));
});

gulp.task('clear', () => {
  return gulp.src('./dist', { read: false })
    .pipe(rimraf({ force: true }));
});

const buildTaskSet = [
  'rebuild',
  'rebuild-app',
  'rebuild-views',
  'less',
  'rebuild-public'
];

gulp.task(
  'build',
  buildTaskSet
);

gulp.task('default', () => {

  gulp.run('build');

});

