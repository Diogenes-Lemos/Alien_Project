const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function copyIndex() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'))
};

function distStyle() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/styles'))
};

function copyJS() {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/js'))
};

function copyIcons() {
    return gulp.src('./src/icons/*')
        .pipe(gulp.dest('./dist/icons'))
};

function copyImg() {
    return gulp.src('./src/images/*')
        .pipe(gulp.dest('./dist/images'))
};

function copyLogos() {
    return gulp.src('./src/logos/*')
        .pipe(gulp.dest('./dist/logos'))
};

exports.sass = distStyle;
exports.javascript = copyJS;

exports.watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(distStyle))
    gulp.watch('./src/js/*.js', gulp.parallel(copyJS))
    gulp.watch('./src/index.html', gulp.parallel(copyIndex))
};

gulp.task('styles', distStyle);
gulp.task('js', copyJS);
gulp.task('icons', copyIcons);
gulp.task('images', copyImg);
gulp.task('logos', copyLogos);
gulp.task('index', copyIndex);

gulp.task('default', gulp.series('index', 'styles', 'js', 'icons', 'images', 'logos'));   