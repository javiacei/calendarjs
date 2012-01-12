dateFormat.i18n = {
	dayNames: [
		"Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab",
		"Domingo", "Lunes", "Jueves", "Miércoles", "Jueves", "Viernes", "Sábado"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
	]
};

Date.prototype.daysInMonth = function () {
   return new Date(this.getFullYear(), this.getMonth()+1, 0).getDate()
}

Date.prototype.previousMonthDate = function() {
  previousDate = new Date(this);
  previousDate.setMonth(this.getMonth() - 1);
  return previousDate;
}

Date.prototype.nextMonthDate = function() {
  nextDate = new Date(this);
  nextDate.setMonth(this.getMonth() + 1);
  return nextDate;
}

randomFromTo = function(from, to){
  return Math.floor(Math.random() * (to - from + 1) + from);
};

/////////////////////////  EVENT ///////////////////////////////
Event = function(message) {
  this.message = message;
}

/////////////////////////  CALENDAR ///////////////////////////////
Calendar = function (format) {
  var self = this;

  this.current = new Date();

  this.format = format;

  this.events = null;

  this.currentDate = function() {
    return this.current;
  }

  this._cleanEvents = function() {
    this.events = {};
  }

  this.moveToPreviousMonth = function() {
    this.current = this.current.previousMonthDate();
    return this;
  }

  this.moveToNextMonth = function() {
    this.current = this.current.nextMonthDate();
    return this;
  }

  this.addEvents = function (/*Array(Event)*/ evs) {
    this.events = evs;
    return this;
  }

  this.hasEvents = function() {
    return _.size(this.events) > 0;
  }
}

/////////////////////////  SERVER PROXY ///////////////////////////////
ServerProxy = function(baseUrl, engine, method) {
  this.baseUrl = baseUrl;

  this.method = method;

  this.engine = engine;

  this.cache = {};

  // Change using AJAX when you need it
  this.get = function(/*Mixed*/ key, /*Delete this field*/ date) {
    if(_.isUndefined(this.cache[key])) {
      // Get elements from server
      var elements = new Array();

      if (this.method == 'POST') {
        // Dynamic calendar emulate
        for(i = 0; i < date.daysInMonth(); i++) {
          var days = new Array();
          for(j = 0; j < randomFromTo(0,3); j++) {
            days.push(new Event('Dynamic Alert ' + j +'  of ' + i + '-' + date.format('mm-yyyy')));
          }

          elements[i] = days;
        }
      } else {

        for (i = 0; i < randomFromTo(1,6); i++) {
          elements.push(new Event('Static Alert of month ' + date.format('mm-yyyy')));
        }
      }
      // SaveInfo into cache
      this.cache[key] = elements;
    }

    return this.cache[key];
  }
}

////////////////////////////////// VIEWS /////////////////////////////////////////////
EventCalendarListView = function(container) {
  var self = this;

  this.el = $('#calendar-list');

  this.container = container;

  this.refresh = function(/*EventCalendar*/ eventCalendar) {
    // Data to draw
    var data = {
      events : eventCalendar.staticCalendar.events
    }

    var template = self.el.html();
    self.container.empty().append(_.template(template, data));
  }
}


EventCalendarTableView = function(container) {
  var self = this;

  this.el = $('#calendar-table');

  this.container = container;

  this.refresh = function(/*EventCalendar*/ eventCalendar) {
    // Data to draw
    var data = {
      events : calendar.dynamicCalendar.events,
      date: calendar.dynamicCalendar.currentDate()
    };

    var template = self.el.html();
    self.container.empty().append(_.template(template, data));
  }
}


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
}
