const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlReplace = require('gulp-html-replace');

async function copyImg() {
    const imagemin = (await import('gulp-imagemin')).default;
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function copyIndex() {
    return gulp.src('./src/index.html')
        .pipe(htmlReplace({
            'css': './dist/styles/main.css'
        }))
        .pipe(gulp.dest('./'));
}

function distStyle(done) {
    gulp.src('./src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'))
        .on('end', done);
}

function testStyle(done) {
    gulp.src('./src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/styles'))
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
exports.index = copyIndex;
exports.javascript = copyJS;
exports.images = copyImg;
exports.test_style = testStyle;

exports.watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(testStyle));
};

gulp.task('styles', distStyle);
gulp.task('js', copyJS);
gulp.task('icons', copyIcons);
gulp.task('images', copyImg);
gulp.task('logos', copyLogos);
gulp.task('index', copyIndex);
gulp.task('test_style', testStyle);

gulp.task('default', gulp.series('index', 'styles', 'js', 'icons', 'images', 'logos'));
