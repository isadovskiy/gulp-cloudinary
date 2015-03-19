<pre>
Example:
=============
var gulpCloudinary = require('gulp-cloudinary'),
	gulp = require('gulp');

var config = { 
	cloud_name: '<cloud_name>', 
	api_key: '<api_key>', 
	api_secret: '<api_secret>'
};

var defaultTags = ['projectX1'];

var builderDefault = new gulpCloudinary(config, defaultTags);

gulp.task('clean', function(){
	builderDefault.deleteOldByTag();
});

gulp.task('upload_images', function() {
  	return gulp.src(['./img/*.jpg', './img/*.gif', './img/*.png'])
  		.pipe(builderDefault.uploader())
  		.pipe(gulp.dest('./dest/'))
});
</pre>
