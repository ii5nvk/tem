"use strict";

var gulp       = require("gulp"),
    useref     = require("gulp-useref"),
    uglify     = require("gulp-uglify"),
    clean      = require("gulp-clean"),
    gulpif     = require("gulp-if"),
    filter     = require("gulp-filter"),
    imagemin   = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    spritesmith = require("gulp.spritesmith"),
    concatCSS  = require("gulp-concat-css"),
    minifyCSS  = require("gulp-clean-css"),
    prettify = require("gulp-html-prettify"),
    less = require("gulp-less"),
    cache        = require("gulp-cache"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync"),
    watch       = require("gulp-watch"),
    reload      = browserSync.reload,
    wiredep    = require("wiredep").stream;

gulp.task("wiredep", function () {
  gulp.src("app/*.html")
    .pipe(wiredep())
    .pipe(gulp.dest("app/"));
});

// ==========================================================
// ===================== Сборка в DIST ======================
// ==========================================================

//Очистка папки
gulp.task("clean", function(){
    return gulp.src("dist")
      .pipe(clean());
});

// Переносим html, css, js в папку dist
gulp.task("useref", function () {
return gulp.src("app/*.html")
    .pipe(useref())
    .pipe(gulpif("*.html", prettify({indent_char: " ", indent_size: 2})))
    .pipe(gulpif("*.js", uglify()))
    .pipe(gulpif("*.css", minifyCSS({compatibility:"ie8"})))
    .pipe(gulp.dest("dist"));
});

// Перенос шрифтов
gulp.task("fonts", function(){
gulp.src("app/fonts/")
  .pipe(filter(["*.eot", "*.svg", "*.ttf", "*.woff", "*.woff2"]))
  .pipe(gulp.dest("dist/fonts/"));
});

// Изображения
gulp.task("images", function(){
  return gulp.src("app/img/**/*")
  .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
  })))
  .pipe(gulp.dest("dist/img"));
});

// Остальные файлы
gulp.task("extras", function(){
  return gulp.src([
      "app/*.*",
      "!app/*.html"
  ]).pipe(gulp.dest("dist"));
});

gulp.task("fonts", function() {
    gulp.src(["app/fonts/**/*"])
        .pipe(gulp.dest("dist/fonts"));
});

// Cборка и вывод размера содержимого папки dist
gulp.task("dist", ["useref", "images", "fonts", "extras"], function(){
return gulp.src("dist/**/*");
});

// Собираем папку DIST
gulp.task("build", ["clean"], function(){
  gulp.start("dist");
});

// ==========================================================
// ===================== Работа в APP =======================
// ==========================================================

// Спрайты
gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('app/img/sprite/*.png') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
            }));

    spriteData.img.pipe(gulp.dest('app/img')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/css')); // путь, куда сохраняем стили
});


// LESS
gulp.task("less", function () {
  return gulp.src("app/css/*.less")
  .pipe(less())
  .pipe(autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })) 
  .pipe(gulp.dest("app/css"));
});

// Запускаем локальный сервер
gulp.task("server", function(){
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: "app"
        }
    });
});

// Cлежка и запуск задач
gulp.task("watch", function () {
    gulp.watch("bower.json", ["wiredep"]);
    gulp.watch("app/css/*.less", ["less"]);
    gulp.watch(["app/css/*.less", "app/css/*.css", "app/js/*.js", "app/*.html"]).on("change", reload);
});

// Задача по умолчанию
gulp.task("default", ["server", "watch", "less"]);