let Utils = {
  addClass: function(element, className) {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += ' ' + className;
  }, 

  removeClass: function(element, className) {
    if (element.classList)
      element.classList.remove(className);
    else
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }, 

  hasClass: function(element, className) {
    if (element.classList)
      return (element.classList.contains(className));
    else
      new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
  }
}