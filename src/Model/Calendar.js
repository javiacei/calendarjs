Calendar = Backbone.Model.extend({

  events: null,

  defaults: function() {
    return {
      current: new Date
    };
  },

  currentDate: function() {
    return this.get('current');
  },

  moveToPreviousMonth: function() {
    this.set({
      current: this.get('current').previousMonthDate()
    });
  },

  moveToNextMonth: function() {
    this.set({
      current: this.get('current').nextMonthDate()
    });
  },

  addEvents: function(evs) {
    this.events = (evs);
  }
});
