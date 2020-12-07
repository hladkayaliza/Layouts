const {series, parallel, src, dest, watch} = require('gulp');
const concatCss = require('gulp-concat-css');
const cleanCSS  = require('gulp-clean-css');
const gulpClean  = require('gulp-clean');
const gulpMinify = require('gulp-minify');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

function serve() {
    browserSync.init({
       server: 'build',
        watch: true
    });
}

function clean() {
    return src('build', {read: false, allowEmpty: true})
        .pipe(gulpClean());
}

function copyHTML(_cb) {
    return src('index.html')
        .pipe(dest('build'));
}

function minifyIMG(_cb) {
    return src('assets/images/*')
        .pipe(imagemin())
        .pipe(dest('build/assets/images'));
}

function transformCSS() {
    return src('assets/styles/**/*.css')
        .pipe(concatCss('assets/styles/bundle.css'))
        .pipe(cleanCSS())
        .pipe(dest('build/assets/styles'));
}

function minifyJS() {
    return src('assets/scripts/*.js')
        .pipe(gulpMinify())
        .pipe(dest('build/assets/scripts'));
}

function watchTasks() {
    watch('index.html', copyHTML);
    watch('assets/styles/**/*.css', transformCSS);
    watch('assets/scripts/**/*.js', minifyJS);
    watch('assets/images/*', minIMG);
}



exports.clean = clean;
exports.watch = watchTasks;
exports.style = transformCSS;
exports.minifyJS = minifyJS;
exports.minifyIMG = minifyIMG;
exports.default = series(
    clean,
    parallel(transformCSS,copyHTML,minifyIMG,minifyJS),
    parallel(watchTasks, serve)
);