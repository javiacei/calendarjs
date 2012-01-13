EventCalendarTableView = function(container) {
  var self = this;

  this.el = $('#calendar-table');

  this.columnTableWidth = 22;

  this.container = container;

  // Configuration
  $('.moment_collapsed').live({
    mouseenter:function(){
      elementWidth = $(this).find('p').width();
      $(this).removeClass('collapsed');
      $(this).css('z-index', 100);
    },mouseleave:function(){
      $(this).addClass('collapsed');
      $(this).css('z-index', 5);
    }
  });

  this.getTableOffset = function(/*date*/ date) {
    var offset;

    switch(date.daysInMonth()) {
      case 28:
        offset = 157;
        break;
      case 29:
        offset = 143;
        break;
      case 30:
        offset = 133;
        break;
      case 31:
        offset = 125;
        break;
    }

    return offset;
  }

  this.refresh = function(/*EventCalendar*/ calendar) {
    var date = calendar.dynamicCalendar.currentDate();

    var currentWidth = self.columnTableWidth * date.daysInMonth();
    var currentLeft = self.getTableOffset(date);

    var previousWidth = self.columnTableWidth * date.previousMonthDate().daysInMonth();
    var previousLeft = currentLeft - previousWidth;

    var nextWidth = self.columnTableWidth * date.nextMonthDate().daysInMonth();
    var nextLeft = currentLeft + currentWidth;

    // Data to draw
    var data = {
      events : calendar.dynamicCalendar.events,
      date: date,

      previousWidth: previousWidth,
      previousLeft: previousLeft,

      currentWidth: currentWidth,
      currentLeft: currentLeft,

      nextWidth: nextWidth,
      nextLeft: nextLeft
    };

    var template = self.el.html();
    self.container.empty().append(_.template(template, data));
  }
}
