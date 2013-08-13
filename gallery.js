// Ractive Image Gallery

define(['Ractive', 'rv!./template'], function(Ractive, template) {
  var Gallery = Ractive.extend({
    template: template,
    init: function(options) {
      // Default values
      this.set('selected', 0);
      this.set('bigview', false);
      this.set('controls', false);

      this.updateMaxHeight();

      this.controlTimeout = createTimeout(3000, function() {
        this.set('controls', false);
      }.bind(this));

      this.on({
        select: function(event, item) {
          item = Math.max(0, item);
          item = Math.min(this.get('images').length - 1, item);
          this.set('selected', item);
          this.set('bigview', true);
        },
        close: function() {
          this.set('bigview', false);
        },
        showControls: function() {
          this.set('controls', true);
          this.controlTimeout();
        }
      });
    },

    // Sets the maximum image height to the browser window height.
    updateMaxHeight: function() {
      this.set('maxheight', document.documentElement.clientHeight);
    }
  });

  return Gallery;

  // Helper functions

  // Creates a timeout that is started and resetted by calling the
  // returned function.
  function createTimeout(timeout, fun) {
    var tid;
    return function() {
      if (tid != null)
        clearTimeout(tid);
      tid = setTimeout(fun, timeout);
    }
  }

});
