EventCalendar = function(container) {
  var self = this;

  this.el = $('#' + container);

  this.current = new Date();

  this.calendars = new Array();

  this.updateDates = function() {
    $('#date_prev span.month').html(this.current.previousMonthDate().format('mmmm yyyy'));
    $('#date_current span.month').html(this.current.format('mmmm yyyy'));
    $('#date_next span.month').html(this.current.nextMonthDate().format('mmmm yyyy'));
  }

  this.addCalendar = function(calendar, calendarView) {
    this.calendars.push(calendar);

    calendar.subscribe({
      'moveToPreviousMonth': calendarView.refresh,
      'moveToNextMonth': calendarView.refresh
    });

    return this;
  }

  this.moveToLeft = function() {
    _.each(this.calendars, function(calendar){
      calendar.moveToPreviousMonth();
    });
    this.current = this.current.previousMonthDate();

    this.updateDates();
    return this;
  }

  this.moveToRight = function() {
    _.each(this.calendars, function(calendar){
      calendar.moveToNextMonth();
    });
    this.current = this.current.nextMonthDate();

    this.updateDates();
    return this;
  }

  // Arrows to go to left and right
  $('span.left.arrow').click(function(e){
    self.moveToLeft();
  });

  $('span.right.arrow').click(function(e){
    self.moveToRight();
  });

  // ARROWS FUNCTIONALITY
  var speed_effect = 200;
  $('#alerts_calendar_content .arrow').hover(function(event) {
    $(this).stop(true,true).animate({width:170}, speed_effect);
      if ($(this).hasClass('left')) $(this).children('a').stop(true, true).animate({left:60}, speed_effect);
      else $(this).children('a').stop(true, true).animate({right:60}, speed_effect);

  }, function(event) {
    $(this).stop(true,true).animate({width:95}, speed_effect);

    if ($(this).hasClass('left')) $(this).children('a').stop(true, true).animate({left:25}, speed_effect);
    else $(this).children('a').stop(true, true).animate({right:25}, speed_effect);

  });
}
