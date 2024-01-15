'use strict';

import gulp from "gulp";
import del from "del";
import runSequence from "run-sequence";
import browserSync from "browser-sync";
import gulpLoadPlugins from "gulp-load-plugins";
import babelify from "babelify";
import browserify from "browserify";
import source from "vinyl-source-stream";
import gutil from "gulp-util";

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const browserifyScript = (script) => {
    return browserify({
        entries: './resources/materials/js/${script}'
    })
        .transform(babelify.configure({
            presets: [`es2015`]
        }))
        .bundle()
        .on(`error`, function (err) {
            gutil.log(gutil.colors.red.bold(`[browserify error]`));
            gutil.log(err.message);
            gutil.log(err);
            this.emit(`end`);
        })
        .pipe(source(script))
        .pipe(gulp.dest('./materials/js'));
};

gulp.task('styles', () => {
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
        './resources/materials/scss/**/*.scss'
    ])
        .pipe($.newer('.tmp/styles'))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 10,
            includePaths: [
                'node_modules/foundation-sites/scss',
                'node_modules/slick-carousel/slick/',
                './node_modules/owl.carousel/src/scss'
            ],
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('.tmp/styles'))
        // Concatenate and minify styles
        .pipe($.if('*.css', $.cssnano()))
        .pipe($.size({title: 'styles'}))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('./materials/css'))
        .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('vendor-scripts', () => {
    return gulp.src([
        './resources/materials/js/**/*.js'
    ])
        .pipe(gulp.dest('./materials/js'));
});

gulp.task('vendors', () => {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/clipboard/dist/clipboard.min.js'
    ])
        .pipe(gulp.dest('./materials/js/vendor'));
});

let scripts = [
    
];

scripts.forEach((script) => {
    gulp.task(script, () => {
        return browserifyScript(script);
    });
});

gulp.task('scripts', scripts);

gulp.task('images', () => {
    gulp.src('./resources/materials/img/favicon.ico')
        .pipe(gulp.dest('./public'));

    return gulp.src('./resources/materials/img/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./materials/img'))
        .pipe($.size({title: 'images'}));
});

gulp.task('fonts', function () {
    return gulp.src('./resources/materials/fonts/**/*')
        .pipe(gulp.dest('./materials/fonts'));
});

gulp.task('clean', () => del(['.tmp', './materials/*'], {dot: true}));

gulp.task('dev', ['default'], () => {
    browserSync({
        notify: false,
        server: 'plain-html',
        port: 3000,
    });

    gulp.watch(['./resources/materials/scss/**/*'], ['styles', reload]);
    // gulp.watch(['./resources/materials/js/**/*'], ['scripts', reload]);
    gulp.watch(['./plain-html/**/*.html'], reload);
});

gulp.task('style', [], (cb) => {
    runSequence(
        // 'clean',
        ['styles'],
        cb
    );
    gulp.watch(['./resources/materials/scss/**/*'], ['styles', reload]);
});

gulp.task('default', [], (cb) => {
    runSequence(
        // 'clean',
        ['styles', 'vendors', 'fonts'],
        cb
    )
});
