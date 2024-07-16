const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function copyIndex() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./'));
}

function distStyle(done) {
    gulp.src('./src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles'))
        .on('end', done);
}

function copyJS() {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./js'));
}

exports.sass = distStyle;
exports.javascript = copyJS;

exports.watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(distStyle));
    gulp.watch('./src/js/*.js', gulp.parallel(copyJS));
    gulp.watch('./src/index.html', gulp.parallel(copyIndex));
};

gulp.task('styles', distStyle);
gulp.task('js', copyJS);
gulp.task('index', copyIndex);

gulp.task('default', gulp.series('index', 'styles', 'js'));
