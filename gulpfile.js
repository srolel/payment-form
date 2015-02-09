var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var spritesmith = require('gulp.spritesmith');
var karma = require('karma').server;
var merge = require('merge-stream');

var appConfig = {
	app: './app/',
	test: './test/',
	bower: './bower/'

};

function app(path) {
	return appConfig.app + (path || '');
}

function test(path) {
	return appConfig.test + (path || '');
}

function bower(path) {
	return appConfig.bower + (path || '');
}

var onError = function (e) {
	gutil.beep();
	console.log(e.toString());
	this.emit('end');
}

function sassTask() {
	return gulp.src(app('styles/*.scss'))
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass())
		.pipe(gulp.dest(app('styles')))
		.pipe(livereload());
}

gulp.task('sass', sassTask);
gulp.task('sass-sprite', ['make-sprite'], sassTask);

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch([app('styles/*.scss'), app('sprites/*.scss')], ['sass']);
	// gulp.watch([test('**/*.js'), app('**/*.js')], ['test']);
})

gulp.task('serve-app', function () {
	gulp.src(app())
		.pipe(webserver({
			port: 8002,
			proxies: [{
				source: '/api',
				target: 'http://localhost:15145/api'
			}]
		}))
});

gulp.task('make-sprite', function () {

	var streams = [];

	streams.push(gulp.src(app('images/flags/*.png'))
		.pipe(spritesmith({
			imgName: 'flags.png',
			imgPath: '/sprites/flags.png',
			cssName: 'flags.scss',
			cssSpritesheetName: 'flags',
			algorithm: 'left-right',
		}))
		.pipe(gulp.dest(app('sprites'))))


	streams.push(gulp.src(app('images/cards/*.png'))
		.pipe(spritesmith({
			imgName: 'cards.png',
			imgPath: '/sprites/cards.png',
			cssName: 'cards.scss',
			cssSpritesheetName: 'cards',
			// algorithm: 'left-right',
		}))
		.pipe(gulp.dest(app('sprites'))))

	return merge.apply(0, streams)
})

gulp.task('sprite', ['sass-sprite']);

gulp.task('test', function (done) {
	karma.start({
		configFile: __dirname + '/test/karma.conf.js',
		singleRun: true
	}, done);
});