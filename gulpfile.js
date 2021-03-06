// Include Gulp
var gulp = require('gulp');

// Include plug-ins
var concat = require('gulp-concat');
var watch = require('gulp-watch');

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
    watch([jumentDir + '**/admin.part?', appDir + '**/admin.part?'], function(){
        gulp.start('admin_concat');
    });

    watch([jumentDir + '**/www.part?', appDir + '**/www.part?'], function(){
        gulp.start('www_concat');
    });
});

// Run all tasks
gulp.task('background', ['admin_concat', 'www_concat', 'watch']);
