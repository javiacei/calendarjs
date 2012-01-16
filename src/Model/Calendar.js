Calendar = function(serverProxy, id) {
  var self = this;

  this.id = id;

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
    this.addEvents(self.proxy.get(
      this.currentDate().format('mm-yyyy'),
      {id: this.id, month: this.current.format('mm'), year: this.current.format('yyyy')}
    ));
    this.fire('init');
    return this;
  }

  this.currentDate = function() {
    return this.current;
  }

  this.moveToPreviousMonth = function() {
    this.current = this.current.previousMonthDate();

    this.addEvents(self.proxy.get(
      this.currentDate().format('mm-yyyy'),
      {id: this.id, month: this.current.format('mm'), year: this.current.format('yyyy')}
    ));
    this.fire('moveToPreviousMonth');
    return this;
  },

  this.moveToNextMonth = function() {
    this.current = this.current.nextMonthDate();

    this.addEvents(self.proxy.get(
      this.currentDate().format('mm-yyyy'),
      {id: this.id, month: this.current.format('mm'), year: this.current.format('yyyy')}
    ));
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
