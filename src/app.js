var eventCalendar = null;

$(document).ready(function(){
  var calendar = new Calendar(new ServerProxy('test', $, 'GET'));
  var calendar2 = new Calendar(new ServerProxy('test2', $, 'POST'));

  var calendarView = new CalendarListView($('#static_alerts'));
  var calendarView2 = new CalendarTableView($('#dynamic_alerts'));

  eventCalendar = new EventCalendar('alerts_calendar_content');
  eventCalendar.addCalendar(calendar, calendarView);
  eventCalendar.addCalendar(calendar2, calendarView2);
});
