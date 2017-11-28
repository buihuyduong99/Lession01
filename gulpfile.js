const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var config = {
    //Include all js files but exclude any min.js files
    src: './styles/*.css',
	filename: 'site.min.css',
	destPath: 'dist'
}
gulp.task('less', function () {
    return gulp.src('./less/**/*site.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./styles'));
});  
gulp.task('minify-css',() => {
    return gulp.src('./styles/*.css')
      .pipe(sourcemaps.init())
      .pipe(concat(config.filename))
      .pipe(cleanCSS())
      .pipe(sourcemaps.write(''))
      .pipe(gulp.dest('dist'));
  });
gulp.task('watch', function () {
    gulp.watch('./less/**/*.less', ['less', 'minify-css']);
});
gulp.task('default', ['less', 'watch', 'minify-css'], function () {

});

