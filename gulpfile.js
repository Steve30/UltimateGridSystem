const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const guppy = require("git-guppy")(gulp);
const gulpEslint = require("gulp-eslint");
const gulpFilter = require("gulp-filter");

gulp.task('css', () => {
  return gulp.src("./src/style/**/*.css")
    .pipe(browserSync.stream());
});

gulp.task('lint', () => {
    return gulp.src('./src/js/**/*.js')
      .pipe(gulpEslint())
      .pipe(gulpEslint.format())
      .pipe(gulpEslint.failAfterError());
});

gulp.task('pre-commit', () => {
  return gulp.src(guppy.src("pre-commit"))
    .pipe(gulpFilter(["src/js/**/*.js"]))
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError());
});

// Static server
gulp.task('browser-sync', ["pre-commit"], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

  gulp.watch("./src/style/**/*.css", ["css"]);
});