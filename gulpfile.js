const gulp = require('gulp');
const sass = require('gulp-sass')
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');

function browserSync(done){
    browsersync.init({
        injectChanges: true,
        server: ['app','dist'],
        port: 8080
    });
    done();
}

function browserSyncReload(done){
    browsersync.reload();
    done();
}

function typescript(){
    const task = tsProject.src()
    .pipe(tsProject());

    return task.js
        .pipe(gulp.dest(tsProject.options.outDir));
}

function scripts(){
     return gulp.src(['./node_modules/systemjs/dist/system.js', './node_modules/systemjs/dist/extras/named-register.js','./dist/js/main.js'])
    .pipe(sourcemaps.init())    
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(tsProject.options.outDir))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(tsProject.options.outDir))
    .pipe(browsersync.stream())
    
}

function css() {
    return gulp.src('./sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expended'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch('./sass/**/*.scss', css);
    gulp.watch('./src/**/*.ts', gulp.series(typescript,scripts));
    gulp.series(browserSyncReload);
}

gulp.task('hello', done => {
    console.log('Hello Gulp');
    done();
});


gulp.task('css', css);
gulp.task('ts', gulp.series(typescript, scripts));
gulp.task('build', gulp.series(css, typescript, scripts))
gulp.task('watch', gulp.series('build', gulp.parallel(watchFiles, browserSync)));