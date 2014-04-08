(function( $, window ) {
  
  var $window = $(window);
  
  /*
   * jquery-more
   * Easily create an ajax-button to load next pages into a container
   */
  
  var pluginName = "more";
  
  var buttonSelector = 'a[data-more]';
  
  var defaults = {
    loadingClass: 'loading', 
    noResults: '', 
    // callback
    success: function() {}
  };
 
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
    
    var selector = buttonSelector;
    
    $(element).on("click", function(e) {
      
      var $target = $(e.target);
      
      if (!$target.is(selector)) {
        $target = $target.parents(selector);
      };
      
      if (!$target.is(selector)) return;
      
      e.preventDefault();
      
      var contentSelector = $target.data('more');
      
      if (contentSelector) {
      
        var href = $target.data('href') || $target.prop('href');
        
        var $contentContainer = $(contentSelector);
        
        $target.addClass(options.loadingClass);
        
        $.ajax({
          url: href, 
          dataType: 'html', 
          success: function (data) {
            
            $target.removeClass(options.loadingClass);
            
            var doc = parseHTMLDocument(data);
            
            var $button = $(doc).find("a[data-more='" + contentSelector + "']");
            
            var contentNode = $(doc).find(contentSelector).get(0);
            
            var removeButton = false;
            
            if ($button.length) {
              
              $target.prop('href', $button.prop('href'));
              $target.attr('data-href', $button.attr('data-href'));
              
              if ($(contentNode).has($button).length) {
                $target.insertAfter($button);
                $button.remove();
              }
              
            } else {
              
              if (options.noResults) {
                // replace button with label
                $('<span>' + options.noResults + "</span>").insertAfter($target);
              }
              removeButton = true;
              
              
            }
            
            if (contentNode) {
              
              var $content = $(contentNode.innerHTML);
              if ($contentContainer.has($target).length) {
                // element is a child of content container, insert before target
                $content.insertBefore($target);
              } else {
                // append to container
                $contentContainer.append($content);
              }

              
            }
            
            if (removeButton) {
              // remove button
              $target.remove();
            }
            
            if ($content.length && options.ready) {
              // exec callback
              options.ready.call(this, $content);
            }
            
          }
        });
        
      } else {
        throw 'content selector has not been specified';
      }
      
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