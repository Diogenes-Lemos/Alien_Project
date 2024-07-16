const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

async function copyImg() {
    const imagemin = (await import('gulp-imagemin')).default;
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function copyIndex() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./'));
}

function distStyle(done) {
    gulp.src('./src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'))
        .on('end', done);
}

function copyJS() {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/js'));
}

function copyIcons() {
    return gulp.src('./src/icons/*')
        .pipe(gulp.dest('./dist/icons'));
}

function copyLogos() {
    return gulp.src('./src/logos/*')
        .pipe(gulp.dest('./dist/logos'));
}

exports.sass = distStyle;
exports.javascript = copyJS;
exports.images = copyImg;

exports.watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(distStyle));
    gulp.watch('./src/js/*.js', gulp.parallel(copyJS));
    gulp.watch('./src/index.html', gulp.parallel(copyIndex));
};

gulp.task('styles', distStyle);
gulp.task('js', copyJS);
gulp.task('icons', copyIcons);
gulp.task('images', copyImg);
gulp.task('logos', copyLogos);
gulp.task('index', copyIndex);

gulp.task('default', gulp.series('index', 'styles', 'js', 'icons', 'images', 'logos'));
