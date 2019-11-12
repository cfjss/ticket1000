mo_title = null;
mo_element = null;

document.onmousemove = function (e) {
	var event = e || window.event;
	var current_title;
	var moposx = e.pageX;  // current 
	var moposy = e.pageY;  // mouse positions

	var tooltips = document.getElementById("tooltips");  // element for displaying stylized tooltips (div, span etc.)

	var current_element = event.target || event.srcElement;  // the element we're currently hovering
	if (current_element == mo_element) return;  // we're still hovering the same element, so ignore
	if(current_element.title){
		current_title = current_element.title;  
	} else {
		current_title = "-_-_-";         // if current element has no title, 
		current_element.title = "-_-_-"; // set it to some odd string that you will never use for a title
	}
	if(mo_element == null){   // this is our first element  
		mo_element = current_element;
		mo_title = current_title;
	}
	if(mo_title) mo_element.title = mo_title;   // restore the title of the previous element

	mo_element = current_element;  // set current values
	mo_title = current_title;      // as default

	if(mo_element.title){
		var mo_current_title = mo_element.title;  // save the element title
		mo_element.title = "";  // set it to none so it won't show over our stylized tooltip
		if(mo_current_title == "-_-_-"){   //  if the title is fake, don't display it
			tooltips.style.display = "none";
			tooltips.style.left = "0px";
			tooltips.style.left = "0px";
			tooltips.innerHTML = "";
		} else { 
			tooltips.style.display = "inline-block";
			tooltips.style.left = (moposx + 10) + "px";
			tooltips.style.top = (moposy + 10) + "px";
			tooltips.innerHTML = mo_current_title;
		}
	}
};