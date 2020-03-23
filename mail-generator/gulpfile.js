const gulp       	 = require('gulp');
const browserSync 	 = require('browser-sync').create();
const plumber 		 = require('gulp-plumber');
const sourcemaps     = require('gulp-sourcemaps');
const uglify         = require('gulp-uglify');
const babel          = require('gulp-babel');
const concat         = require('gulp-concat');

gulp.task('browser-sync', function(done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        notify: false
    });

    browserSync.watch('./js/**/*.js').on('change', browserSync.reload);
    browserSync.watch('./*.html').on('change', browserSync.reload);

    done()
});
gulp.task('js', function (done) {
    gulp.src('js/source/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js/min/'));
    done()
});


gulp.task('default', gulp.series('browser-sync','js', function(done) {
    gulp.watch('./js/source/**/*.js', gulp.series('js'));
    done()
}));
