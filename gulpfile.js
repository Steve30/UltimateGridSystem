const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const gulpEslint = require("gulp-eslint");

const refreshBrowser = () => {
  return gulp.src("./src/style/**/*.css")
    .pipe(browserSync.stream());
}

const watchScss = () => {
  return gulp.watch("./src/style/**/*.css", gulp.series(refreshBrowser));
}

const createServer = () => {
  return browserSync.init({
    server: {
        baseDir: "./"
    }
  });
}

const watches = gulp.parallel(watchScss);
const initServer = gulp.series(createServer);

const developmentTask = gulp.parallel(initServer, watches);

gulp.task("build", developmentTask);