(function( $, window ) {
  
  var $window = $(window);
  
  /*
   * jquery-more
   * Easily create an ajax-button to load next pages into a container
   */
  
  var pluginName = "more";
  
  var defaults = {
    selector: 'a[data-more]', 
    loadingClass: 'loading', 
    // callback
    success: function() {}
  };
  
  /*
   * jquery-plugin 'getSelector' for reverse selector engineering
   * http://stackoverflow.com/questions/2420970/how-can-i-get-selector-from-jquery-object/15623322#15623322
   */ 
  
  // prevent name-clash
  var _jQueryGetSelector = $.fn.getSelector;
  !function(e,t){var n=function(e){var n=[];for(;e&&e.tagName!==t;e=e.parentNode){if(e.className){var r=e.className.split(" ");for(var i in r){if(r.hasOwnProperty(i)&&r[i]){n.unshift(r[i]);n.unshift(".")}}}if(e.id&&!/\s/.test(e.id)){n.unshift(e.id);n.unshift("#")}n.unshift(e.tagName);n.unshift(" > ")}return n.slice(1).join("")};e.fn.getSelector=function(t){if(true===t){return n(this[0])}else{return e.map(this,function(e){return n(e)})}}}(window.jQuery);
  var jQueryGetSelector = $.fn.getSelector;
  $.fn.getSelector = _jQueryGetSelector;

  /*
   * Parses a html-string into an entire html document
   * http://stackoverflow.com/questions/7474710/can-i-load-an-entire-html-document-into-a-document-fragment-in-internet-explorer
   */
  function parseHTMLDocument(html) {
    var doc = document.implementation.createHTMLDocument(""), 
      doc_elt = doc.documentElement, 
      first_elt;
    doc_elt.innerHTML = html;
    first_elt = doc_elt.firstElementChild;
    if ( // are we dealing with an entire document or a fragment?
      doc_elt.childElementCount === 1 && first_elt.tagName.toLowerCase() === "html") {
      doc.replaceChild(first_elt, doc_elt);
    }
    return doc;
  }

  
  /* 
   * jquery-more plugin class
   */
  function MoreButton(element, options) {
    
    var selector = options.selector;
    $(element).on("click", function(e) {
      var $target = $(e.target);
      if (!$target.is(selector)) {
        $target = $target.parents(selector);
      };
      if (!$target.is(selector)) return;
      var contentSelector = $target.data('more') || jQueryGetSelector.call($(element), true);
      $target.addClass(options.loadingClass);
      var href = $target.data('href') || $target.prop('href');
      $.ajax({
        url: href, 
        dataType: 'html', 
        success: function (data) {
          var doc = parseHTMLDocument(data);
          var node = $(doc).find(contentSelector).get(0);
          if (node) {
            var $content = $(node.innerHTML);
            $(contentSelector).append($content);
            $target.removeClass(options.loadingClass);
            $target.remove();
            if (options.ready) {
              options.ready.call(this, $content);
            }
          }
        }
      });
      
      e.preventDefault();
      return false;
    });
    
  }
  
  var pluginClass = MoreButton;
  
  // bootstrap plugin
  $.fn[pluginName] = function(options) {
    options = $.extend({}, defaults, options);
    return this.each(function() {
      if (!$(this).data(pluginName)) {
        $(this).data(pluginName, new pluginClass(this, options));
      }
      return $(this);
    });
  };
    

})( jQuery, window );