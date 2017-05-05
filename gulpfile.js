'use strict';

//команда gulp          -   для разработки
//команда gulp build    -   для production 

var 	gulp           = require('gulp'),

		//Компиляция сss
		autoprefixer    = require('gulp-autoprefixer'), 	//	Добавляет префиксы старых браузеров
		sass            = require('gulp-sass'), 			//	Компилятор для sass
	    sourcemaps      = require('gulp-sourcemaps'), 		//	Для sass - карты
	    bourbon        	= require('node-bourbon'),			//	Библиотека для sass миксинов
	    cleanCSS       	= require('gulp-clean-css'),		//	
	    cssnano         = require('gulp-cssnano'), 			//	Сжатие css
	    uncss           = require('gulp-uncss'), 			//	Удаление неиспользуемых стилей
	    plumber         = require('gulp-plumber'), 			//	Запрет на вылет при ошибке в sass

	    //Компиляция картинок
	    imagemin        = require('gulp-imagemin'), 		//	Сжатие картинок
	    pngquant        = require('imagemin-pngquant'),

	    //Компиляция html
    	fileinclude     = require('gulp-file-include'), 	//	Инклюдит содержимое из других файлов
    	gulpRemoveHtml  = require('gulp-remove-html'), 		//	Удаление из html <!-- Deject -->
    	prettify        = require('gulp-html-prettify'), 	// 	Красота в html

    	//Компиляция js
    	uglify          = require('gulp-uglify'), 			// 	Cжатие js файлов

    	//Загрузка на ftp
    	ftp            = require('vinyl-ftp'),

    	//Служебные
    	cache          	= require('gulp-cache'),			// 	Помещает данные в кеш
    	gutil          	= require('gulp-util' ),			//	Mодуль gulp.js, добавляющий вспомогательные функции как логирование, подсветка вывода в консоли, и так далее
    	rename          = require('gulp-rename'), 			//	Переименование файлов
	    concat          = require('gulp-concat'), 			//	Конкатенация файлов
	    debug           = require('gulp-debug'), 			//	Для дебаггинга файлов .pipe(debug({title: 'unicorn:'}))
	    rimraf          = require('rimraf'),     			//	Удаление файлов (Очистка каталога)
	    del          	= require('del'),	    			//	Удаление файлов (Очистка каталога)
	    newer           = require('gulp-newer'), 			//	Кеш файлов 
	    notify          = require("gulp-notify"),  			//	Сообщения об ошибках = окошко справа
	    watch           = require('gulp-watch'),   			//	Наблюдает за файлами и запускает синхронно задачи
	    browserSync     = require('browser-sync'), 			//	Сервер и liveReload
	    reload          = browserSync.reload;

//Все пути тут... 
var path = {
	//Production
    build: {
        html:   'build/',
        css:    'build/assets/css/',
        js:     'build/assets/js/',
        img:    'build/assets/img/',
        assets: 'build/assets/'
    },
    //Разработка
    app: {
        html:           'app/src/',
        html_all:       'app/*.html',
        css_dynamic_min:'app/css/dynamic.min.css',
        css:            'app/css',
        css_another:    'app/css/*.css',
        js:             'app/js/',
        img:            'app/images/**/*.*',
        assets:         'app/assets/**/*.*'
    },
    //Отслеживание изменений
    watch: {
        html:           'app/edit/*.html',
        html_parts:     'app/edit/parts/*.html',
        scss:           'app/edit/sass/**/*.scss',
        scss_template:  'app/edit/sass/template.scss',
        scss_dynamic:   'app/edit/sass/dynamic.scss',
        js:             'app/edit/js/*.js',
    },
    // },
    // Очистка директории build
    clean: './build'

};

//Таск запускает сервер
gulp.task('webserver', function() {
	browserSync({
		server: {
			baseDir: 'app/src'
		},
		notify: false,
		// open: false
	});
});

gulp.task('deploy', function() {

    var conn = ftp.create({
        host:      'timra.ru',
        user:      'ftp_timra_1',
        password:  'EyS6U54VT7A',
        parallel:  10,
        log: gutil.log
    });

    var globs = [
    'dist/**',
    // 'dist/.htaccess',
    ];
    return gulp.src(globs, {buffer: false})
    .pipe(conn.dest('/www/site1/public_html/my_test/'));

});

//Очистка папки build
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb); // Очистить папку, чтобы записать туда измененные файлы
});

//Таск html
gulp.task('html', function () {
    gulp.src(path.watch.html)
        .pipe(fileinclude({ prefix: '@@'}))  // Инклюдит содержимое в html
        .pipe(gulp.dest(path.app.html))  // Перекладывает в папку app
        .pipe(reload({stream: true}))    // Обновляет страницу
});

gulp.task('dev', [
    'html',
    // 'css',
    // 'pluginsCSS',
    // 'js',
    // 'pluginsJS',
]);

gulp.task('watch', function(){

    //Наблюдаем за HTML файлами
    watch([path.watch.html_parts], function(event, cb) {
        gulp.start('html');
    });

    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });

    // //Наблюдаем за SCSS файлами
    // watch([path.watch.scss], function(event, cb) {
    //     gulp.start('css');
    // });

    // //Наблюдаем за JS файлами
    // watch([path.watch.js], function(event, cb) {
    //     gulp.start('js');
    // });
});

gulp.task('default', ['dev', 'webserver', 'watch']);

// //Таск html
// gulp.task('html', function () {
//     gulp.src(path.watch.html)
//         .pipe(fileinclude({ prefix: '@@'}))  // Инклюдит содержимое в html
//         .pipe(gulp.dest(path.app.html))  	// Перекладывает в папку app

// gulp.task('sass', ['headersass'], function() {
// 	return gulp.src('app/sass/**/*.sass')
// 		.pipe(sass({
// 			includePaths: bourbon.includePaths
// 		}).on("error", notify.onError()))
// 		.pipe(rename({suffix: '.min', prefix : ''}))
// 		.pipe(autoprefixer(['last 15 versions']))
// 		.pipe(cleanCSS())
// 		.pipe(gulp.dest('app/css'))
// 		.pipe(browserSync.reload({stream: true}))
// });

// gulp.task('headersass', function() {
// 	return gulp.src('app/header.sass')
// 		.pipe(sass({
// 			includePaths: bourbon.includePaths
// 		}).on("error", notify.onError()))
// 		.pipe(rename({suffix: '.min', prefix : ''}))
// 		.pipe(autoprefixer(['last 15 versions']))
// 		.pipe(cleanCSS())
// 		.pipe(gulp.dest('app'))
// 		.pipe(browserSync.reload({stream: true}))
// });

// gulp.task('libs', function() {
// 	return gulp.src([
// 		'app/libs/jquery/dist/jquery.min.js',
// 		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
// 		'app/libs/isotope/dist/isotope.pkgd.min.js',
// 		'app/libs/imagesloaded/imagesloaded.pkgd.min.js',
// 		// 'app/libs/jquery-lazy/jquery.lazy.min.js',
// 		// 'app/libs/fullpage.js/jquery.fullPage.min.js'
// 		])
// 		.pipe(concat('libs.min.js'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('app/js'));
// });

// gulp.task('watch', ['sass', 'libs', 'browser-sync'], function() {
// 	gulp.watch('app/header.sass', ['headersass']);
// 	gulp.watch('app/sass/**/*.sass', ['sass']);
// 	gulp.watch('app/*.html', browserSync.reload);
// 	gulp.watch('app/js/**/*.js', browserSync.reload);
// });

// gulp.task('imagemin', function() {
// 	return gulp.src('app/img/**/*')
// 		.pipe(cache(imagemin({
// 			interlaced: true,
// 			progressive: true,
// 			svgoPlugins: [{removeViewBox: false}],
// 			use: [pngquant()]
// 		})))
// 		.pipe(gulp.dest('dist/img')); 
// });


// gulp.task('removedist', function() { return del.sync('dist'); });

// gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'libs'], function() {

// 	var buildCss = gulp.src([
// 		'app/css/fonts.min.css',
// 		'app/css/main.min.css'
// 		]).pipe(gulp.dest('dist/css'));

// 	var buildFiles = gulp.src([
// 		'app/.htaccess'
// 	]).pipe(gulp.dest('dist'));

// 	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

// 	var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));

// });

// gulp.task('clearcache', function () { return cache.clearAll(); });

// gulp.task('default', ['watch']);