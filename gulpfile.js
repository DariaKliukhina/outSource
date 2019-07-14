"use strict";

var gulp = require("gulp");

var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");
var uglify = require("gulp-uglify");
var babel = require('gulp-babel');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');


gulp.task("style", function() {
    gulp.src("src/static/styl/style.styl")
        .pipe(plumber())
      .pipe(stylus({
        // includePaths: require('node-normalize-scss').includePaths
      }))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("build/static/css"))
        .pipe(gulp.dest("src/static/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/static/css"))
        .pipe(gulp.dest("src/static/css"))
        .pipe(server.stream());
});
gulp.task("sprite", function() {
    return gulp.src("src/img/svg/*.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/static/img"));
});

gulp.task('views', function buildHTML() {
  return gulp.src('src/views/*.pug')
    .pipe(pug({
      pretty: true
    }))

    .pipe(gulp.dest("src"))
    .pipe(gulp.dest("build"))

});

gulp.task("html", function() {
    return gulp.src("src/*.html")
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest("build"));
});

gulp.task("serve", ["style"], function() {
    server.init({
        server: "src/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });
    gulp.watch("src/static/styl/**/*.styl", ["style"]);
    gulp.watch("src/views/*.pug", ["views"]);
    gulp.watch("src/*.html").on("change", server.reload);
});


gulp.task("babel", function () {
    gulp.src("src/static/js/script.js")
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(rename("main.js"))
      .pipe(gulp.dest("build/static/js"))
      .pipe(gulp.dest("src/static/js"));
});

gulp.task("uglify", function () {
  gulp.src("src/static/js/script.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("src/static/js"))
    .pipe(gulp.dest("build/static/js"));
});

gulp.task("build", function (done) {
    run(
        "clean",
        "copy",
        "style",
        "babel",
        "views",
        done
    );
});
gulp.task("copy", function (done) {
    return gulp.src([
      "src/static/img/**",
      "src/static/fonts/**",
      "src/static/js/**",
      "src/static/css/*.css",
      "src/*.html"
    ], {
        base: "src"
    })
        .pipe(gulp.dest("build/"));
});


gulp.task("clean", function () {
    return del("build");
});
