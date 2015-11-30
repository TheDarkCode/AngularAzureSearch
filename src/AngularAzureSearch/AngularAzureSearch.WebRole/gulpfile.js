

var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort');
var strip = require('gulp-strip-comments');
var templateCache = require('gulp-angular-templatecache');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var tar = require('gulp-tar');

gulp.task('builddlFooterTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/dlFooter/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/dlFooter/',
            module: 'dlFooter'
        }))
        .pipe(gulp.dest('./ext-modules/dlFooter/'))
    ;
});

gulp.task('builddlParallaxTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/dlParallax/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/dlParallax/',
            module: 'dlParallax'
        }))
        .pipe(gulp.dest('./ext-modules/dlParallax/'))
    ;
});

gulp.task('builddlPriceTableTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/dlPriceTable/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/dlPriceTable/',
            module: 'dlPriceTable'
        }))
        .pipe(gulp.dest('./ext-modules/dlPriceTable/'))
    ;
});

gulp.task('builddlGalleryTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/dlGallery/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/dlGallery/',
            module: 'dlGallery'
        }))
        .pipe(gulp.dest('./ext-modules/dlGallery/'))
    ;
});

gulp.task('builddlPanelTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/dlPanel/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/dlPanel/',
            module: 'dlPanel'
        }))
        .pipe(gulp.dest('./ext-modules/dlPanel/'))
    ;
});

gulp.task('builddlMenuTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/dlMenu/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/dlMenu/',
            module: 'dlMenu'
        }))
        .pipe(gulp.dest('./ext-modules/dlMenu/'))
    ;
});

gulp.task('builddlSearchTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/dlSearch/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/dlSearch/',
            module: 'dlSearch'
        }))
        .pipe(gulp.dest('./ext-modules/dlSearch/'))
    ;
});

gulp.task('builddlDashboardTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/dlDashboard/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/dlDashboard/',
            module: 'dlDashboard'
        }))
        .pipe(gulp.dest('./ext-modules/dlDashboard/'))
    ;
});

gulp.task('builddlFrameworkTemplateCache', function () {
    return gulp
        .src([
            './ext-modules/dlFramework/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/dlFramework/',
            module: 'dlFramework'
        }))
        .pipe(gulp.dest('./ext-modules/dlFramework/'))
    ;
});

gulp.task('buildAllJavaScript', function () {
    return gulp
        .src([
            './ext-modules/**/*.js'
        ])
        .pipe(angularFilesort())
        .pipe(strip(["use strict"]))
        .pipe(strip())
        .pipe(concat('dlFramework.js'))
        .pipe(gulp.dest('./dist/'))
    ;
});

gulp.task('builddlFrameworkJavaScript', function () {
    return gulp
        .src([
            './ext-modules/dlFooter/*.js',
            './ext-modules/dlParallax/*.js',
            './ext-modules/dlPriceTable/*.js',
            './ext-modules/dlGallery/*.js',
            './ext-modules/dlPanel/*.js',
            './ext-modules/dlSearch/*.js',
            './ext-modules/dlMenu/*.js',
            './ext-modules/dlDashboard/*.js',
            './ext-modules/dlFramework/*.js',
        ])
        .pipe(angularFilesort())
        .pipe(strip(["use strict"]))
        .pipe(strip())
        .pipe(concat('dlFramework.js'))
        .pipe(gulp.dest('./dist/'))
    ;
});

gulp.task('builddlFrameworkTar', function () {
    return gulp.src(['dist/dlFramework.js', '!./dist/*.tar.gz'])
        .pipe(tar('dlFramework.js.tar'))
        .pipe(gzip({ gzipOptions: { level: 9 } }))
        .pipe(gulp.dest('./dist/'))
    ;
});

gulp.task('buildAllJavaScriptwithUseStrictandComments', function () {
    return gulp
        .src([
            './ext-modules/**/*.js'
        ])
        .pipe(angularFilesort())
        .pipe(concat('dlFramework.js'))
        .pipe(gulp.dest('./dist/'))
    ;
});

gulp.task('buildAllJavaScriptwithCommentsNoUseStrict', function () {
    return gulp
        .src([
            './ext-modules/**/*.js'
        ])
        .pipe(angularFilesort())
        .pipe(strip(["use strict"]))
        .pipe(concat('dlFramework.js'))
        .pipe(gulp.dest('./dist/'))
    ;
});

gulp.task('buildAllCSS', function () {
    return gulp
        .src([
            './ext-modules/**/*.css'
        ])
        .pipe(strip())
        .pipe(concat('dlFramework.css'))
        .pipe(gulp.dest('./dist/'))
    ;
});

gulp.task('buildAllCSSwithComments', function () {
    return gulp
        .src([
            './ext-modules/**/*.css'
        ])
        .pipe(concat('dlFramework.css'))
        .pipe(gulp.dest('./dist/'))
    ;
});

gulp.task('git-commit', function () {
    var v = version();
    gulp.src(['./dist/*', './package.json', './bower.json'])
      .pipe(git.add())
      .pipe(git.commit(v))
    ;
});

gulp.task('git-push', function (cb) {
    var v = version();
    git.push('origin', 'master', function (err) {
        if (err) return cb(err);
        git.tag(v, v, function (err) {
            if (err) return cb(err);
            git.push('origin', 'master', { args: '--tags' }, cb);
        });
    });
});

gulp.task('build', function () {
    return gulp.src(['dist/*', '!./dist/*.tar.gz'])
      .pipe(tar('dlFramework.js.tar'))
      .pipe(gzip({ gzipOptions: { level: 9 } }))
      .pipe(gulp.dest('dist/'));
});
