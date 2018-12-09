/// I get the UTC time as local time from new Date()
/// I need the client's TimezoneOffset if I want to localize the datetime here
/// Solved the date formatting with JQuery on the frontend
/// Not sure if that's the good approach to the problem, got to look into it 

var dateformatter = {};

dateformatter.offset = new Date().getTimezoneOffset();

dateformatter.options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false,
    };
dateformatter.nicedate = function (datestring) { 

	var date = new Date(datestring);
	var date2 = Date.parse(datestring);
//  	console.log(this.offset + " " + date2)
	date2 += this.offset * 60000;
// 	console.log(date2)
	
	
      
// 	return Intl.DateTimeFormat('en-US', this.options).format(date);
 	var dattt = new Date(date2);
//  	console.log(date + " " + date2 + " " + dattt);
 	return date2.toLocaleString("en-US", this.options)
};

module.exports = dateformatter;