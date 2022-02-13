import gulp from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify-es';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import pugHtml from './gulp/tasks/pug';
const sass = require('gulp-sass')(require('sass'));


export const browsersync = () => {
   browserSync.init({
      server: {
         baseDir: 'app/'
      }
   });
};

export const cleanDist = () => {
   return del('dist')
};

export const buildStyles = () => {
    return gulp.src('app/scss/style.scss')
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
         overrideBrowserslist: ['last 10 version'],
         grid: true
      }))
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.stream())
};

export const scripts = () => {
     return gulp.src([
     // 'node_modules/jquery/dist/jquery.js',
      'app/js/main.js'
   ])
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'))
      .pipe(browserSync.stream())
};

export const images = () => {
   return gulp.src('app/images/**/*')
      .pipe(imagemin([
         imagemin.gifsicle({ interlaced: true }),
         imagemin.mozjpeg({ quality: 75, progressive: true }),
         imagemin.optipng({ optimizationLevel: 5 }),
         imagemin.svgo({
            plugins: [
               { removeViewBox: true },
               { cleanupIDs: false }
            ]
         })
      ]))
      .pipe(gulp.dest('dist/images'))
};

export const build = () => {
   return gulp.src([
      'app/css/style.min.css',
      'app/fonts/**/*',
      'app/js/main.min.js',
      'app/*.html'
   ], { base: 'app' })
      .pipe(gulp.dest('dist'))
};

export const watching = () => {
   gulp.watch(['app/pug/**/*.pug'], pugHtml);
   gulp.watch(['app/scss/**/*.scss'], buildStyles);
   gulp.watch(['app/js/**/*.js', '!app/js/**/main.min.js'], scripts);
   gulp.watch(['app/*.html']).on('change', browserSync.reload);
};

export default gulp.parallel(
   pugHtml,
   buildStyles,
   scripts, 
   browsersync, 
   watching
);

export const buildDist = gulp.series(
   cleanDist, 
   images, 
   build);