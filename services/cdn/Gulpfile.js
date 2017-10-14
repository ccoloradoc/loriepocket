var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('html', function() {
    gulp.src('src/**.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('img', function() {
    gulp.src('src/img/**.*')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('build', ['html', 'img', 'styles'], function() {
  console.log('Task completed');
});

//Watch task
gulp.task('default',function() {
    gulp.watch('src/sass/**/*.scss',['styles']);
});
