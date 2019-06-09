"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
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

gulp.task("style", function() {
    gulp.src("src/static/sass/style.scss")
        .pipe(plumber())
      .pipe(sass({
        includePaths: require('node-normalize-scss').includePaths
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
    gulp.watch("src/static/sass/**/*.{scss,sass}", ["style"]);
    gulp.watch("src/*.html").on("change", server.reload);
});
gulp.task("uglify", function () {
    gulp.src("src/static/js/script.js")
        .pipe(uglify())
        .pipe(rename("script.min.js"))
        .pipe(gulp.dest("build/static/js"));
});
gulp.task("build", function (done) {
    run(
        "clean",
        "copy",
        "style",
        // "uglify",
        // "sprite",
        // "html",
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
