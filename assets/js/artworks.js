//
// The javscript asset package for the "artworks" app.
//
// It's a good pattern to organize your asset packages by a package per app.
// This generally means these javascript asset files are going to be quite
// small, often just a line of initialize code like this.
//

require('jquery')(require('../../apps/artworks/client.js').init)
