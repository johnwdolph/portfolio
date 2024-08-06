const gulp = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const moment = require('moment');
const glob = require('glob');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');

// Load configuration from config.yaml
const config = yaml.load(fs.readFileSync('./personal_config.yaml', 'utf8'));

gulp.task('html', function() {
    const my_name = config.my_name;
    const sub_title = config.sub_title;
    const closing_remark = config.closing_remark;
    const images = glob.sync('./images/showcase/*.{jpg,png,gif}').map(file => path.basename(file));
    const date = moment().format('MMMM Do YYYY');

  return gulp.src('./index.ejs')
    .pipe(ejs({ my_name: my_name, sub_title: sub_title, closing_remark: closing_remark, showcase: images, date: date }, {}, { ext: '.html' }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('.'));
});

gulp.task('default', gulp.series('html'));
