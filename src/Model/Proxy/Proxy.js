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
        for(i = 1; i <= date.daysInMonth(); i++) {
          var days = new Array();
          for(j = 0; j < randomFromTo(0,2); j++) {
            days.push(new Event({message: 'Dynamic Alert ' + j +'  of ' + i + '-' + date.format('mm-yyyy')}));
          }

          elements[i] = days;
        }
      } else {

        for (i = 0; i < randomFromTo(1,5); i++) {
          elements.push(new Event({message: 'Static Alert of month ' + date.format('mm-yyyy')}));
        }
      }
      // SaveInfo into cache
      this.cache[key] = elements;
    }

    return this.cache[key];
  }
}
