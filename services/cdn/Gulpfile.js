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

//Watch task
gulp.task('default',function() {
    gulp.watch('src/sass/**/*.scss',['styles']);
});
