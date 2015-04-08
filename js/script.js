////Lightbox for gallery

var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');
var $caption = $('<p></p>');

//Add image to overlay
$overlay.append($image);

//Add image to overlay
$overlay.append($caption);

//Add overlay to body
$("body").append($overlay);


//Capture click event on a link to an image.
$(".gallery-section a").click(function(event){
  event.preventDefault();
  var imageLocation=$(this).attr("href");
  
   //Update overlay with the linked image.
   $image.attr("src", imageLocation);
  
  //1.1-Show the overlay.
  $overlay.show();
  
  //Get child's alt attribute and set caption
  var captionText = $(this).children("img").attr("alt"); 
  $caption.text(captionText);
  
});

//Hide the overlay when it's clicked again.

$overlay.click(function(){
  $(this).hide();  
});

/////////////////////////////////////////////////////////////////////////
//////Sneaky-Sneak: I'm not 100% sure how this works, but I'll get there!
//////I do feel bad for copy and pasting code, but I'm still learning;
//////This does what I want it too, I'm just unable to wrap my head around
//////it completely right now.///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var ScrollSneak = function(prefix, wait) {
    // clean up arguments (allows prefix to be optional - a bit of overkill)
    if (typeof(wait) == 'undefined' && prefix === true) prefix = null, wait = true;
    prefix = (typeof(prefix) == 'string' ? prefix : window.location.host).split('_').join('');
    var pre_name;
 
    // scroll function, if window.name matches, then scroll to that position and clean up window.name
    this.scroll = function() {
        if (window.name.search('^'+prefix+'_(\\d+)_(\\d+)_') == 0) {
            var name = window.name.split('_');
            window.scrollTo(name[1], name[2]);
            window.name = name.slice(3).join('_');
        }
    }
    // if not wait, scroll immediately
    if (!wait) this.scroll();
 
    this.sneak = function() {
    // prevent multiple clicks from getting stored on window.name
	if (typeof(pre_name) == 'undefined') pre_name = window.name;
 
	// get the scroll positions
        var top = 0, left = 0;
        if (typeof(window.pageYOffset) == 'number') { // netscape
            top = window.pageYOffset, left = window.pageXOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) { // dom
            top = document.body.scrollTop, left = document.body.scrollLeft;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) { // ie6
            top = document.documentElement.scrollTop, left = document.documentElement.scrollLeft;
        }
	// store the scroll
        if (top || left) window.name = prefix + '_' + left + '_' + top + '_' + pre_name;
        return true;
    }
}

$(document).ready(function(){
   var sneaky = new ScrollSneak(location.hostname);

		///Applied to navigation links to keep page from jumping.
    	$('.navigation-links a').each(function(){ 
            this.onclick = sneaky.sneak;
        });
 });



