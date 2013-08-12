// Ractive Image Gallery

define(['Ractive', 'rv!./template'], function(Ractive, template) {
  var Gallery = Ractive.extend({
    template: template,
    init: function(options) {
      // Default values
      this.set('selected', 0);
      this.set('bigview', false);

      this.updateMaxHeight();

      this.on({
        select: function(event, item) {
          item = Math.max(0, item);
          item = Math.min(this.get('images').length - 1, item);
          this.set('selected', item);
          this.set('bigview', true);
        },
        close: function() {
          this.set('bigview', false);
        }
      });
    },

    // Sets the maximum image height to the browser window height.
    updateMaxHeight: function() {
      this.set('maxheight', document.documentElement.clientHeight);
    }
  });

  return Gallery;
});
