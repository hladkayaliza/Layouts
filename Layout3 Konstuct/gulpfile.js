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
    return src('build', {read: false})
        .pipe(gulpClean());
}

function copyHTML(_cb) {
    return src('index.html')
        .pipe(dest('build'));
}

function minIMG(_cb) {
    return src('assets/images/*')
        .pipe(imagemin())
        .pipe(dest('build/images'));
}

function transformCSS() {
    return src('assets/styles/**/*.css')
        .pipe(concatCss('styles/bundle.css'))
        .pipe(cleanCSS())
        .pipe(dest('build'));
}

function minifyJS() {
    return src('assets/scripts/*.js')
        .pipe(gulpMinify())
        .pipe(dest('build'));
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
exports.default = series(
    clean,
    parallel(transformCSS,copyHTML,minIMG,minifyJS),
    parallel(watchTasks, serve)
);