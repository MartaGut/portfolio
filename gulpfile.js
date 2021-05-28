var gulp = require('gulp');

var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var fontName = 'myFont';
const runSequence = require('run-sequence');

gulp.task('hello', async function () {
    console.log('Hello Marta');
});

gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('dist/css'))
});

gulp.task('lint', function () {
    return gulp.src('app/scss/*.scss')
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
  });

  gulp.task('watch', function () {
    gulp.watch('app/scss/*.scss', ['sass', 'lint']);
})

gulp.task('iconfont', async function(){
  gulp.src(['app/fonts/svg/*.svg'])
     .pipe(iconfontCss({
        fontName: fontName,
        path: 'dist/template/_icons.scss',
        targetPath: '../../fonts/iconfont/_fonts.scss',
        fontPath: '../../dist/fonts/iconfont/',
     }))
     .pipe(iconfont({
        fontName: fontName,
        normalize: true,
      fontHeight: 1001
     }))
     .pipe(gulp.dest('dist/fonts/iconfont/'));
});

gulp.task('icons', ['iconfont', 'sass']);

gulp.task('default', function (callback) {
  runSequence(['sass', 'watch'],
    callback
  )
})


  gulp.task('icons', ['iconfont', 'sass']);

  gulp.task('default', function (callback) {
    runSequence(['sass', 'watch'],
      callback
    )
  })

  gulp.task('copyfonts', () =>
  gulp.src('./app/fonts/*.{ttf,woff,woff2}')
    .pipe(gulp.dest('./dist/fonts'))
);

