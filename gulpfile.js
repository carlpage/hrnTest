var gulp = require('gulp');
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    // concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer');

var plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

// Delete the dist directory
gulp.task('clean', function() {
  return gulp.src('./dev/**')
    .pipe(clean());
});

// sass compilation and css minification
gulp.task('styles', function() {
  gulp.src('./dev/scss/main.scss')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass())
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({ stream: true }));
});

// js file minification
gulp.task('scripts', function() {
  gulp.src(['./dev/scripts/**.js', '!./js/*/min.js'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(rename({ suffix: '.min' }))
    .pipe(stripDebug())
    .pipe(uglify().on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); this.emit('end'); }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({ stream: true }));
});

// image compression task
gulp.task('images', function() {
  gulp.src('./dev/images/*')
    .pipe(plumber(plumberErrorHandler))
    .pipe(rename({ suffix: '.min' }))
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// html reload
gulp.task('html', function() {
  gulp.src(['./**.html'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(browserSync.reload({stream: true}));
});

// watch all tasks
gulp.task('serve', function() {
  browserSync.init({
    server: { baseDir: './' }
  });
  gulp.watch('./dev/scripts/*.js', ['scripts']);
  gulp.watch('./dev/scss/*.scss', ['styles']);
  gulp.watch('./dev/images/*.*', ['images']);
  gulp.watch('./dev/*.html', ['html']);
});

gulp.task('default', ['styles', 'html', 'scripts', 'images', 'serve']);
