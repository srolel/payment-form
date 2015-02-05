var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var run = require('gulp-run');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var spritesmith = require('gulp.spritesmith');
var karma = require('karma').server;

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

var onError = function (err) {
	gutil.beep();
	console.log(err);
}

gulp.task('sass', function () {
	//append stuff to each scss before compiling. 
	//$path-to-images is used by all images/fonts.
	// var pathToImages = '$path-to-images: "https://trstorage1.blob.core.windows.net/dashboard-dist-images";',
	return gulp.src(app('styles/*.scss'))
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass())
		.pipe(gulp.dest(app('styles')))
		.pipe(livereload());
})

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch([app('styles/*.scss'), app('sprites/*.scss')], ['sass']);
	gulp.watch([test('**/*.js'), app('**/*.js')], ['test']);
})

gulp.task('serve-app', function () {
	gulp.src(app())
		.pipe(webserver({
			port: 8002,
			proxies: [{
				source: '/api',
				target: 'http://trdashboardstaging.azurewebsites.net/api'
			}]
		}))
});

gulp.task('sprite', function () {

	gulp.src(app('images/**/*.png'))
		.pipe(spritesmith({
			imgName: 'flags.png',
			imgPath: '/sprites/flags.png',
			cssName: 'flags.scss',
			algorithm: 'left-right',
		}))
		.pipe(gulp.dest(app('sprites')))

	gulp.src(app('images/cards/*.png'))
		.pipe(spritesmith({
			imgName: 'cards.png',
			imgPath: '/sprites/cards.png',
			cssName: 'cards.scss',
			algorithm: 'left-right',
		}))
		.pipe(gulp.dest(app('sprites')))
})

var testFiles = [
	bower('angular/angular.js'),
	bower('angular-mocks/angular-mocks.js'),
	bower('angular-payment/payment-0.2.0.js'),
	app('scripts/**/*.js'),
	test('mock/**/*.js'),
	test('spec/**/*.js')
]

gulp.task('test', function (done) {
	karma.start({
		configFile: __dirname + '/test/karma.conf.js',
		singleRun: true
	}, done);
});