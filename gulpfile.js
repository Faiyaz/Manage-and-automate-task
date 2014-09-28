// Include Gulp
var gulp = require('gulp');

// Include plug-ins
var concat = require('gulp-concat');

// Setup directories
var jumentDir = './app/jument/config/htaccess/';
var appDir = './app/config/htaccess/';
var webDir = './web/';

// Concatenation for admin
gulp.task('admin_concat', function() {
	return gulp.src([appDir + 'admin.part?', jumentDir + 'admin.part?'])
		.pipe(concat('.admin.htaccess'))
		.pipe(gulp.dest(webDir))
});

//  Concatenation for www
gulp.task('www_concat', function() {
	return gulp.src([appDir + 'www.part?', jumentDir + 'www.part?'])
		.pipe(concat('.www.htaccess'))
		.pipe(gulp.dest(webDir))
});

// Watch for any file changes
gulp.task('watch', function () {
	gulp.watch(jumentDir + '*.part?', ['admin_concat', 'www_concat']);
	gulp.watch(appDir + '*.part?', ['admin_concat', 'www_concat']);
});

// Run all tasks
gulp.task('default', ['admin_concat', 'www_concat', 'watch']);
