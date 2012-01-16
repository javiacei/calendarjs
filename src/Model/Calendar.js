Calendar = function(serverProxy) {
  var self = this;

  this.events = null;

  this.proxy = serverProxy;

  this.listeners = {
    'moveToPreviousMonth': new Array(),
    'moveToNextMonth': new Array(),
    'init': new Array()
  }

  this.current = new Date();

  // Methods

  this.init = function() {
    this.addEvents(self.proxy.get(this.currentDate()));
    this.fire('init');
    return this;
  }

  this.currentDate = function() {
    return this.current;
  }

  this.moveToPreviousMonth = function() {
    this.current = this.current.previousMonthDate();

    this.addEvents(self.proxy.get(this.currentDate()));
    this.fire('moveToPreviousMonth');
    return this;
  },

  this.moveToNextMonth = function() {
    this.current = this.current.nextMonthDate();

    this.addEvents(self.proxy.get(this.currentDate()));
    this.fire('moveToNextMonth');
    return this;
  }

  this.addEvents = function(evs) {
    this.events = evs;
  }

  this.subscribe = function(listeners) {
    _.each(listeners, function(listener, ev){
      self.listeners[ev].push(listener);
    });

    return this;
  }

  this.fire = function(ev) {
    _.each(this.listeners[ev], function(handle){
      handle(self);
    });
  }
}
