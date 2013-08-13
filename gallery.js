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
        // Closes the big image view.
        // Shows the controls first when they're not visible. This
        // improves usability on touch devices.
        close: function() {
          if (this.get('controls'))
            this.set('bigview', false);
          else
            this.showControls();
        },
        showControls: this.showControls
      });
    },

    // Sets the maximum image height to the browser window height.
    updateMaxHeight: function() {
      this.set('maxheight', document.documentElement.clientHeight);
    },
    // Shows the prev/next controls.
    showControls: function() {
      this.set('controls', true);
      this.controlTimeout();
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
