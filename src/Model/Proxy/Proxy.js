ServerProxy = function(url, engine, method) {
  var self = this;

  this.url = url;

  this.method = method;

  this.engine = engine;

  this.cache = {};

  // Change using AJAX when you need it
  this.get = function(date) {
    var key = date.format('mm-yyyy');

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

  //this.get = function(/*Mixed*/ key, /*Object*/ data, userFriendly) {
  //  var url = this.url;

  //  // UserFriendly transformation
  //  if (true == userFriendly) {
  //    _.each(data, function (value){
  //      url += '/' + value;
  //    });

  //    data = null;
  //  }

  //  if(_.isUndefined(this.cache[key])) {
  //    // Get elements from server
  //    var request = this.engine.ajax({
  //      url: url,
  //      type: self.method,
  //      data: data,
  //      success: function(response) {
  //        console.log(response);
  //      }
  //    });

  //    // SaveInfo into cache
  //    this.cache[key] = elements;
  //  }

  //  return this.cache[key];
  //}
}
