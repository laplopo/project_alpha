


function replaceURLs(text)
    {
      var exp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;
      return text.replace(exp,"<a target='_blank' rel='noopener noreferrer' href='$1'>$1</a>"); 
    }
    

function removeAnchors(text){
    var exp = /(<a target='_blank' rel='noopener noreferrer' href='.*'>|<\/a>)/g;
    return text.replace(exp,""); 
    
}
    
module.exports.replaceURLs = replaceURLs;
module.exports.removeAnchors = removeAnchors;