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
