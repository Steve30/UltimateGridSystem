const gulp        = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('css', function() {
  return gulp.src("./src/style/**/*.css")
    .pipe(browserSync.stream());
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

  gulp.watch("./src/style/**/*.css", ["css"]);
});