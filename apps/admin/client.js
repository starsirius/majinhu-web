//
// The client-side code for the commits page.
//
// [Browserify](https://github.com/substack/node-browserify) lets us write this
// code as a common.js module, which means requiring dependecies instead of
// relying on globals. This module exports the Backbone view and an init
// function that gets used in /assets/commits.js. Doing this allows us to
// easily unit test these components, and makes the code more modular and
// composable in general.
//

var Backbone = require('backbone')
  , sd = require('sharify').data
  , pinyin = require('pinyin')
  , uuid = require('node-uuid')
  , Artwork = require('../../models/artwork.js');

Backbone.$ = $;

module.exports.AdminView = AdminView = Backbone.View.extend({

  events: {
    'submit #artwork-create-form': 'submitForm'
  },

  initialize: function() {},

  submitForm: function(e) {
    e.preventDefault();

    var data = $(e.currentTarget).serializeObject()
      , artwork = new Artwork(this.transformFormData(data))
      , imageHash = uuid.v1()
      , imageForm = new FormData()
      , that = this;

    artwork.set({
      id: pinyin(data.title, {style: pinyin.STYLE_NORMAL}).join("-").toLowerCase(),
      images: {
        image_versions: ["original"],
        image_url: ["", imageHash, ":version.jpg"].join("/")
      },
      owner: "jinhu-ma"
    });

    imageForm.append("image", $('#artwork-create-image')[0].files[0]);
    imageForm.append("uuid", imageHash);
    imageForm.append("version", "original");
    $.ajax({
      url: "/admin/artwork/image",
      type: "POST",
      data: imageForm,
      cache: false,
      processData: false,  // tell jQuery not to process the data
      contentType: false,  // tell jQuery not to set contentType
      success: function(data, textStatus, jqXHR) {
      },
      error: function(jqXHR, textStatus, error) {
        that.showError(error);
      }
    });

    artwork.url = sd.API_URL + "/artworks";
    artwork.isNew = function() { return true; };
    artwork.save(null, {
      success: function(model, response, options) {
        if (response._status === "ERR") {
          for (var field in response._issues) {
            that.showError(field + " " + response._issues[field]);
          }
        } else {
        }
      },
      error: function(model, response, options) {
      }
    });
  },

  transformFormData: function(data) {
    var map = {
      width     : function(v) { return parseFloat(v); },
      height    : function(v) { return parseFloat(v); },
      category  : function(v) { return [v]; },
      date      : function(v) { return new Date(v).toUTCString(); }
    }

    for (var k in data) {
      if (k in map) data[k] = map[k](data[k]);
    }
    return data;
  },

  showMessage: function(message, className, isClear) {
    // TODO Should move the template to a file and use swigify
    // https://www.npmjs.org/package/swigify
    var template = '<div class="alert"></div>'
      , $container = $('.admin-artwork-create .messages')
      , $template = $(template).addClass(className).html(message);

    if (isClear == null) isClear = false;

    if (isClear) $container.html($template);
    else $container.append($template);
  },

  showError: function(error, isClear) {
    this.showMessage(error, 'alert-danger', isClear);
  },

  showSuccess: function(message, isClear) {
    this.showMessage(message, 'alert-success', isClear);
  }
});

module.exports.init = function() {
  new AdminView({
    el: $('body')
  });
};
