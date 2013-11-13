$(function() {
  hideComments();
});

jQuery.expr[':'].regex = function(elem, index, match) {
  var matchParams = match[3].split(','),
                    validLabels = /^(data|css):/,
                    attr = {
                      method: matchParams[0].match(validLabels) ? 
                      matchParams[0].split(':')[0] : 'attr',
                      property: matchParams.shift().replace(validLabels,'')
                    },
                    regexFlags = 'ig',
                    regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
  return regex.test(jQuery(elem)[attr.method](attr.property));
}

var show = true;
var elementsToShowById = [];

function showComments() {
  jQuery.each(elementsToShowById, function() {
    $(this).show();
  });
}

function hideComments() {

  var disqusExpression = '.*disqus_thread.*';
  var commentExpression = '.*[Cc]o(m|mm)ent.*';
  
  getVisibleElements('id', commentExpression);
  getVisibleElements('class', commentExpression);
  getVisibleElements('id', disqusExpression);

  jQuery.each(elementsToShowById, function() {
    $(this).hide();
  });
}

function getVisibleElements(attribute, expression) {
  $(':regex(' + attribute + ', ' + expression + ')').filter(function() {
    if ($(this).is(':visible')){
      elementsToShowById.push($(this));
    }
  });
}
