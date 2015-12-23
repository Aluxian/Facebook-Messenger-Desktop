fs = require 'fs-extra-promise'
gulp = require 'gulp'
del = require 'del'

manifest = require '../src/package.json'

# Remove the default_app folder and the default icon inside the darwin64 build
gulp.task 'clean:build:darwin64', ['download:darwin64'], ->
  del [
    './build/darwin64/' + manifest.productName + '.app/Contents/Resources/default_app'
    './build/darwin64/' + manifest.productName + '.app/Contents/Resources/atom.icns'
  ]

# Remove the default_app folder inside the linux builds
['linux32', 'linux64'].forEach (dist) ->
  gulp.task 'clean:build:' + dist, ['download:' + dist], ->
    del './build/' + dist + '/opt/' + manifest.name + '/resources/default_app'

# Remove the default_app folder inside the win32 build
gulp.task 'clean:build:win32', ['download:win32'], ->
  del './build/win32/resources/default_app'

# Clean build for all platforms
gulp.task 'clean:build', [
  'clean:build:darwin64'
  'clean:build:linux32'
  'clean:build:linux64'
  'clean:build:win32'
]

# Clean all the dist files for darwin64 and make sure the dir exists
gulp.task 'clean:dist:darwin64', ->
  del './dist/' + manifest.productName + '.dmg'
    .then -> fs.ensureDirAsync './dist'

# Just ensure the dir exists (dist files are overwritten)
['linux32', 'linux64', 'win32'].forEach (dist) ->
  gulp.task 'clean:dist:' + dist, ->
    fs.ensureDirAsync './dist'

# Clean dist for all platforms
gulp.task 'clean:dist', [
  'clean:dist:darwin64'
  'clean:dist:linux32'
  'clean:dist:linux64'
  'clean:dist:win32'
]