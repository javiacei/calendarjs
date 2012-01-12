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
