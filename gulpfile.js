const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

gulp.task('pug-compile', () => {
  return gulp.src([
    'src/**/*.pug',
    '!src/components/**/*.pug',
    '!src/config/**/*.pug',
    '!src/templates/**/*.pug',
  ])
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
});

gulp.task('sass', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(sass())
    .pipe(concat('sass.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream())
});

gulp.task('default',() => {
  browserSync.init({
    server: { baseDir: './dist' }
  });
  gulp.watch('src/**/*.pug', gulp.series('pug-compile'));
  gulp.watch('src/**/*.scss', gulp.series('sass'));
});
