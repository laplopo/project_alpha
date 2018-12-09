const options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false,
};


$( ".date" ).each( function( index, element ){ 
      var date = new Date($( this).text()); 
       
    //   $(this).text(Intl.DateTimeFormat(options).format(date));
          $( this).text(date.toLocaleString('en-US',options));
});