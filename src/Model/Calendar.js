Calendar = Backbone.Model.extend({
  events: null,

  listeners: {
    'moveToPreviousMonth': new Array(),
    'moveToNextMonth': new Array()
  },

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
    this.addEvents(this.get('proxy').get(this.currentDate()));
    this.fire('moveToPreviousMonth');
    return this;
  },

  moveToNextMonth: function() {
    this.set({
      current: this.get('current').nextMonthDate()
    });
    this.addEvents(this.get('proxy').get(this.currentDate()));
    this.fire('moveToNextMonth');
    return this;
  },

  addEvents: function(evs) {
    this.events = evs;
  },

  subscribe: function(/*Object*/ listeners) {
    var that = this;
    _.each(listeners, function(listener, ev){
      that.listeners[ev].push(listener);
    });
    return this;
  },

  fire: function(ev) {
    var that = this;
    _.each(this.listeners[ev], function(handle){
      handle(that);
    });
  }
});
