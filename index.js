var cloudinary = require('cloudinary'),
	gutil = require('gulp-util'),
	chalk = require('chalk'),
	through = require('through2');


function gulpCloudinary(config, tags) {
	this.config = config;
	this.tags = tags;
	cloudinary.config(this.config);
}

gulpCloudinary.prototype.deleteOldByTag = function(){
	var self = this;
	//remove images with by tags
	cloudinary.api.delete_resources_by_tag(self.tags, function(data){
		console.log(data);
	});
}

gulpCloudinary.prototype.uploader = function(){
	var self = this,
		count = 0;

	return through.obj(function (file, enc, cb) {
	
		cloudinary.uploader.upload(file.path, function(data) {
			count++;
			gutil.log(file.path + ' -> ' + data.url);
			cb();
		},{ tags: self.tags });
		
	}, function (cb) {
		gutil.log('Uploaded: ' + chalk.green(count + ' items'));
		gutil.log('Sprite: ' + chalk.green('http://res.cloudinary.com/' + self.config.cloud_name + '/image/sprite/{tag}.png' + "\n Tags: " + self.tags.join(',')));
		cb();
	});   
}


module.exports = gulpCloudinary;	