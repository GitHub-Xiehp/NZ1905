const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("html", done => {
    gulp
      .src("src/*.html")
      .pipe(gulp.dest("dist"))
      .pipe(connect.reload());
    done();
  }); 
  gulp.task("sass", done => {
    gulp
      .src("src/sass/*.scss")
      .pipe(sourcemaps.init())  //初始化
      .pipe(sass({ outputStyle: "compact" }))  //转换
      .pipe(sourcemaps.write())  //写入映射
      .pipe(gulp.dest("dist/css"))  //放到指定位置
      .pipe(connect.reload());  //html页面改变时，让服务器重新加载，刷新页面
    done();
  });
  gulp.task("imgs", done => {
    gulp.src("src/imgs/**").pipe(gulp.dest("dist/imgs"));
    done();
  });
  gulp.task("babel", done => {
    gulp
      .src("src/js/*.js")
      .pipe(babel({ presets: ["@babel/env"] }))  //
      .pipe(gulp.dest("dist/js"))
      .pipe(connect.reload());
    done();
  });
  gulp.task("libs", done => {
    gulp.src("src/libs/*.js").pipe(gulp.dest("dist/libs"));
    done();
  });
  gulp.task("server", done => {
    connect.server({
      root: "dist",
      livereload: true
    });
    done();
  });
  
  gulp.task("watch", done => {
    gulp.watch("src/*.html", gulp.series("html"));
    gulp.watch("src/sass/*.scss", gulp.series("sass"));
    gulp.watch("src/js/*.js", gulp.series("babel"));
    gulp.watch("src/libs/*.js", gulp.series("libs"));
    gulp.watch("src/imgs/**", gulp.series("imgs"));
    done();
  });
  
  gulp.task("default", gulp.parallel("server", "watch"));

  //总结 ：开服务器，监听   基本配置完成
  //