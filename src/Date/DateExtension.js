// Spanish dates
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

// Days in a month
Date.prototype.daysInMonth = function () {
   return new Date(this.getFullYear(), this.getMonth()+1, 0).getDate()
}

// -1 Month
Date.prototype.previousMonthDate = function() {
  previousDate = new Date(this);
  previousDate.setMonth(this.getMonth() - 1);
  return previousDate;
}

// +1 Month
Date.prototype.nextMonthDate = function() {
  nextDate = new Date(this);
  nextDate.setMonth(this.getMonth() + 1);
  return nextDate;
}
