let {src, dest}  = require('gulp'),
    changed      = require('gulp-changed'),
    cache        = require('gulp-cached'),
    rename       = require('gulp-rename');

let responsive   = require('gulp-responsive'),
    imagemin     = require('gulp-imagemin'),
    jpeg         = require('imagemin-mozjpeg'),
    png          = require('imagemin-pngquant'),
    gif          = require('imagemin-gifsicle');

let htmlmin      = require('gulp-htmlmin');

let stylus       = require('gulp-stylus'),
    cssmin       = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq         = require('gulp-group-css-media-queries');

let closure = require('gulp-closure-compiler-service');

var minify = require('gulp-minifier');

exports.img = () =>
    // src('images/*.{png,jpeg,jpg,JPG,gif}')
    src('images/*.{png,jpeg,jpg,JPG,gif}')
        .pipe(changed('static/img'))
        .pipe(imagemin([
            jpeg({ quality: 80 }),
            png(),
            gif()
        ]))
        .pipe(responsive({
            // '*.{png,gif}': [{}],
            '*.{jpeg,jpg,JPG}': [{
                format: 'jpg'
            },{
                format: 'jpg',
                width: 560,
                rename: { suffix: '-560' }
            },{
                format: 'jpg',
                width: 1120,
                rename: { suffix: '-1120' }
            },{
                format: 'jpg',
                width: 1680,
                rename: { suffix: '-1680' }
            }],
            '*.{png,jpeg,jpg,JPG,gif}': [{
                format: 'webp'
            },{
                format: 'webp',
                width: 560,
                rename: { suffix: '-560' }
            },{
                format: 'webp',
                width: 1120,
                rename: { suffix: '-1120' }
            },{
                format: 'webp',
                width: 1680,
                rename: { suffix: '-1680' }
            }]
        }, {
      errorOnEnlargement: false
    }))
        .pipe(dest('static/img'));
exports.tmb = () =>
    src('images/tmb/*.{png,jpeg,jpg,JPG,gif}')
        .pipe(changed('static/img'))
        .pipe(imagemin([
            jpeg({ quality: 90 }),
            png(),
            gif()
        ]))
        .pipe(responsive({
            '*.{jpeg,jpg,JPG}': [{format: 'jpg'}],
            '*.{png,jpeg,jpg,JPG}': [{
                format: 'webp'
            },{
                format: 'webp',
                width: 120,
                height: 120,
                rename: { suffix: '-120' }
            },{
                format: 'jpg',
                width: 120,
                height: 120,
                rename: { suffix: '-120' }
            },{
                format: 'webp',
                width: 240,
                height: 240,
                rename: { suffix: '-240' }
            },{
                format: 'jpg',
                width: 240,
                height: 240,
                rename: { suffix: '-240' }
            },{
                format: 'webp',
                width: 360,
                height: 360,
                rename: { suffix: '-360' }
            },{
                format: 'jpg',
                width: 360,
                height: 360,
                rename: { suffix: '-360' }
            },{
                format: 'webp',
                width: 700,
                rename: { suffix: '-700' }
            },{
                format: 'jpg',
                width: 700,
                rename: { suffix: '-700' }
            },{
                format: 'webp',
                width: 1400,
                rename: { suffix: '-1400' }
            },{
                format: 'jpg',
                width: 1400,
                rename: { suffix: '-1400' }
            },{
                format: 'webp',
                width: 2100,
                rename: { suffix: '-2100' }
            },{
                format: 'jpg',
                width: 2100,
                rename: { suffix: '-2100' }
            }]
        }, {
      errorOnEnlargement: false
    }))
        .pipe(dest('static/img'));
exports.html = () =>
    src('public/*.html')
        .pipe(cache('html'))
        .pipe(minify({
            minify: true,
            minifyHTML: {
                collapseWhitespace: true,
                conservativeCollapse: true
            }
        }))
        .pipe(dest('public'))
exports.css = () =>
    src('stylus/*.styl')
        .pipe(cache('css'))
        .pipe(stylus())
        .pipe(gcmq())
        .pipe(autoprefixer({
            stats: ['> 3% in JP']
        }))
        .pipe(dest('static'))
        .pipe(minify({
            minify: true,
            minifyCSS: true
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(dest('static'))
exports.js = () =>
    src('js/*.js')
        .pipe(cache('js'))
        .pipe(dest('static'))
        .pipe(minify({
            minify: true,
            minifyJS: {sourceMap: false}
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(dest('static'))