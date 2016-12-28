var gulp = require('gulp');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var srcmaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
var bs = require('browser-sync').create();


gulp.task("style", function () {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['> 0.1%']
        }))
        .pipe(minify())
        .pipe(srcmaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(bs.stream());
});

gulp.task('html', function () {
   return gulp.src('./src/*.html')
       .pipe(rigger())
       .pipe(gulp.dest('./build'));
});

gulp.task('fonts', function () {
    return gulp.src('./src/fonts/*.*')
        // .pipe(gulp.symlink('./build/fonts'))
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('watch', function () {
    gulp.watch('./src/css/*.less', gulp.series('style'));
    gulp.watch('./src/*.html', gulp.series('html')).on('change', bs.reload);
    gulp.watch('./src/fonts/*.*', gulp.series('fonts'));

});

gulp.task('serve', function () {
    bs.init({
        proxy: 'less7',
        browser: 'chrome',
        startPath: '/build',
        notify: false
    });
});

gulp.task('dev', gulp.parallel('watch','serve'));