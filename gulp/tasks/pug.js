import gulp from 'gulp';
import concat from 'gulp-concat';
import pug from 'gulp-pug';

const pugHtml = () => {
   return gulp.src('./app/pug/index.pug')
      .pipe(
         pug({
            pretty: true
         })
      )
      .pipe(concat('index.html'))
      .pipe(gulp.dest('app'));
};

export default pugHtml;