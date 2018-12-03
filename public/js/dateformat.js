var dateformatter = {};

dateformatter.options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false,
      timeZone: "UTC"
    };
dateformatter.nicedate = function (date) { 
	return Intl.DateTimeFormat('CET', this.options).format(date);
};

module.exports = dateformatter;