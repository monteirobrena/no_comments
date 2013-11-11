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

function showComments() {
  $("div:regex(id, .*[Cc]o(m|mm)ent.*)").show();
  $("div:regex(class, .*[Cc]o(m|mm)ent.*)").show();
  $('div:regex(id, .*disqus_thread.*)').show();
}

function hideComments() {
  $("div:regex(id, .*[Cc]o(m|mm)ent.*)").hide();
  $("div:regex(class, .*[Cc]o(m|mm)ent.*)").hide();
  $('div:regex(id, .*disqus_thread.*)').hide();
}
