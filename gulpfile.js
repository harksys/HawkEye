const del        = require('del');
const gulp       = require('gulp');
const rename     = require('gulp-rename');
const runSeq     = require('run-sequence');
const typescript = require('gulp-typescript');

/**
 * Clean Task
 *
 * Clean up old build. Nice and clean.
 */
gulp.task('clean', () => del(['./app.js', './main.js']));

/**
 * Main Task
 *
 * Build the main file for Electron
 */
gulp.task('main', () =>
{
  var tsProject = typescript.createProject('tsconfig.main.json');
  var res       = gulp.src('src/Main.ts')
                      .pipe(tsProject());

  return res.js
            .pipe(rename('main.js'))
            .pipe(gulp.dest('./'));
});

/**
 * Default Task
 *
 * Do all the things.
 */
gulp.task('default', cb => runSeq('clean', 'main', cb));
