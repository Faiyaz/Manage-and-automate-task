// This file uses native gulp.watch
// Include Gulp
var gulp = require('gulp');

// Include plug-ins
var concat = require('gulp-concat');

// Setup directories
var jumentDir = 'app/jument/config/htaccess/';
var appDir = 'app/config/htaccess/';
var webDir = 'web/';

// Concatenation for admin
gulp.task('admin_concat', function() {
	return gulp.src([appDir + 'admin.part?', jumentDir + 'admin.part?'])
		.pipe(concat('.admin.htaccess'))
		.pipe(gulp.dest(webDir));
});

//  Concatenation for www
gulp.task('www_concat', function() {
	return gulp.src([appDir + 'www.part?', jumentDir + 'www.part?'])
		.pipe(concat('.www.htaccess'))
		.pipe(gulp.dest(webDir));
});

// Watch for all events in specified {directories}/{files}, then trigger appropriate task
gulp.task('watch', function () {
    gulp.watch([jumentDir + '**/admin.part?', appDir + '**/admin.part?'], function(event) {
        console.log('File: ' + event.path + ' was ' + event.type);
        gulp.start('admin_concat');
    });

    gulp.watch([jumentDir + '**/www.part?', appDir + '**/www.part?'], function(event) {
        console.log('File: ' + event.path + ' was ' + event.type);
        gulp.start('www_concat');
    });
});

// Run all tasks
gulp.task('background', ['admin_concat', 'www_concat', 'watch']);
