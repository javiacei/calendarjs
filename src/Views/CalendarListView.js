CalendarListView = function(container) {
  var self = this;

  this.el = $('#calendar-list');

  this.container = container;

  this.refresh = function(/*EventCalendar*/ calendar) {
    // Data to draw
    var data = {
      events : calendar.events
    }

    var template = self.el.html();
    self.container.empty().append(_.template(template, data));

    self.updateEventsPositions(_.size(data.events));
  }


  this.updateEventsPositions = function(nEvents) {
    switch (nEvents) {
      case 1:
        $('#static_alerts ul li:nth-child(1)').css('top','30%').css('left','41%');
        break;
      case 2:
        $('#static_alerts ul li:nth-child(1)').css('top','23%').css('left','25%');
        $('#static_alerts ul li:nth-child(2)').css('top','23%').css('left','52%');
        break;
      case 3:
        $('#static_alerts ul li:nth-child(1)').css('top','6%').css('left','25%');
        $('#static_alerts ul li:nth-child(2)').css('top','6%').css('left','53%');
        $('#static_alerts ul li:nth-child(3)').css('top','57%').css('left','41%');
        break;
      case 4:
        $('#static_alerts ul li:nth-child(1)').css('top','6%').css('left','25%');
        $('#static_alerts ul li:nth-child(2)').css('top','6%').css('left','53%');
        $('#static_alerts ul li:nth-child(3)').css('top','57%').css('left','25%');
        $('#static_alerts ul li:nth-child(4)').css('top','57%').css('left','53%');
        break;
      case 5:
        $('#static_alerts ul li:nth-child(1)').css('top','6%').css('left','12%');
        $('#static_alerts ul li:nth-child(2)').css('top','6%').css('left','38%');
        $('#static_alerts ul li:nth-child(3)').css('top','6%').css('left','64%');
        $('#static_alerts ul li:nth-child(4)').css('top','57%').css('left','22%');
        $('#static_alerts ul li:nth-child(5)').css('top','57%').css('left','51%');
        break;
      case 6:
        $('#static_alerts ul li:nth-child(1)').css('top','6%').css('left','15%');
        $('#static_alerts ul li:nth-child(2)').css('top','6%').css('left','41%');
        $('#static_alerts ul li:nth-child(3)').css('top','6%').css('left','65%');
        $('#static_alerts ul li:nth-child(4)').css('top','57%').css('left','15%');
        $('#static_alerts ul li:nth-child(5)').css('top','57%').css('left','41%');
        $('#static_alerts ul li:nth-child(6)').css('top','57%').css('left','65%');
        break;
      default:
        break;
    }
  }
}
