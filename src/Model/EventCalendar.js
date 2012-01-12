EventCalendar = function(container) {
  var self = this;

  this.el = $('#' + container);

  this.listeners = {
    'moveToLeft' : new Array(),
    'moveToRight' : new Array()
  };

  this.serverProxies = {
    staticCalendar: new ServerProxy(
      'http://events.localhost.com/rest/static-events',
      $,
      'GET'
    ),
    dynamicCalendar: new ServerProxy(
      'http://events.localhost.com/rest/dynamic-events',
      $,
      'POST'
    )
  };

  this._moveTo = function(/*Function*/ moveCalendarHandle) {
    _.each(this.serverProxies, function (proxy, calendarName){
      var calendar = self[calendarName];

      // Call calendar method to move its date where correspond
      calendar[moveCalendarHandle]();

      var calendarFormat = calendar.format;
      // Look for events by date (using calendar format)
      // Ex: proxy.get('01-2012') --> Give me events generated in January of 2012
      var eventsKey = calendar.currentDate().format(calendarFormat);
      var events = proxy.get(eventsKey, /*Delete*/ calendar.currentDate());

      // Insert events into specific calendar
      calendar.addEvents(events);
    });

    this.updateDates(this.dynamicCalendar.currentDate());
  }

  this.updateDates = function(date) {
    $('#date_prev span.month').html(this.staticCalendar.currentDate().previousMonthDate().format('mmmm yyyy'));
    $('#date_current span.month').html(this.staticCalendar.currentDate().format('mmmm yyyy'));
    $('#date_next span.month').html(this.staticCalendar.currentDate().nextMonthDate().format('mmmm yyyy'));
  }

  this.moveToLeft = function() {
    this._moveTo('moveToPreviousMonth');
    this.fire('moveToLeft');
    return this;
  }

  this.moveToRight = function() {
    this._moveTo('moveToNextMonth');
    this.fire('moveToRight');
    return this;
  }

  this.subscribe = function(/*Object*/ listeners) {
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

  // STATIC CALENDAR
  var staticCalendarView = new EventCalendarListView($('#static_alerts'));
  this.subscribe({
    'moveToLeft' : staticCalendarView.refresh,
    'moveToRight' : staticCalendarView.refresh
  });
  this.staticCalendar = new Calendar('mm-yyyy');


  // DYNAMIC CALENDAR
  var dynamicCalendarView = new EventCalendarTableView($('#dynamic_alerts'));
  this.subscribe({
    'moveToLeft' : dynamicCalendarView.refresh,
    'moveToRight' : dynamicCalendarView.refresh
  });
  this.dynamicCalendar = new Calendar('mm-yyyy');

  // Arrows to go to left and right
  $('span.left.arrow').click(function(e){
    self.moveToLeft();
  });

  $('span.right.arrow').click(function(e){
    self.moveToRight();
  });
}
