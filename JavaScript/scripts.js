
// Global variable for easy access to the CSS varables
var rootElement = document.querySelector(":root");

// From W3schools, only diffenrent naming
// https://www.w3schools.com/howto/howto_js_dropdown.asp accessed 3-08-2022
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownToggle() {
    document.getElementById("accessDrop").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.drop-btn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


// Sets the text size accorsing to the input form the access menu
function changeTextSize(size) {
  let paras = document.getElementsByClassName("art-final-body");

  // No matter the size, first thing we change the body text size 
  // second, a call to update the text loactions to prevent overflow

  if (size == "small") {
    document.getElementsByTagName("html")[0].style.fontSize = '50%'
    updateParaContent();
  } else if (size == "med") {
    document.getElementsByTagName("html")[0].style.fontSize = '100%'
    updateParaContent();
  } else {
    document.getElementsByTagName("html")[0].style.fontSize = '150%'
    updateParaContent();
  }
}

// Sets the CSS colour variables according to the Access menu input
function changeTheme(theme) {
  if (theme == "normal") {
    // for the font colours 
    rootElement.style.setProperty("--font-colour-primary", "rgb(255, 255, 255)");
    rootElement.style.setProperty("--font-colour-secondary", "rgb(0, 0, 0)");
    // for the decorative and background colours
    rootElement.style.setProperty("--background-primary", "rgb(0, 0, 210)");
    rootElement.style.setProperty("--background-secondary", "rgb(240, 240, 240)");
    rootElement.style.setProperty("--background-tertiary", "rgb(160, 160, 160)");
  } else {
    // For the font colours
    rootElement.style.setProperty("--font-colour-primary", "rgb(255, 255, 255)");
    rootElement.style.setProperty("--font-colour-secondary", "rgb(0, 0, 0)");
    // for the decorative and background colours
    rootElement.style.setProperty("--background-primary", "rgb(0, 0, 0)");
    rootElement.style.setProperty("--background-secondary", "rgb(250, 250, 250)");
    rootElement.style.setProperty("--background-tertiary", "rgb(180, 180, 180)");
  }
}

// changes the focus element for a better view when tabbing though the document
function changeFocus(checked) {
  if (checked) {
    // Setting it stronger and more visisble 
    rootElement.style.setProperty('--focus-colour', "red");
    rootElement.style.setProperty('--focus-size', "0.2em");
  } else {
    // reseting to the default 
    rootElement.style.setProperty('--focus-colour', "rgb(104, 104, 226)");
    rootElement.style.setProperty('--focus-size', "0.15em");
  }
}

// Every time the window resizes and we are on the home page
// we readjust the articel preview text to prevent overflow. 
window.onresize = function () {
  if (document.getElementsByTagName('title')[0].innerText == "TechUP | Home") {
    // Update the text content to prevent ugly overflow
    updateParaContent();
  }
}

// Inspiration from Mr. Finellis, I copied his Idea and adaptied it 
//(also the code is with jquirey, so I really could not have copied it)
// YouTube series for guidance:   
    // https://www.youtube.com/playlist?list=PLtV5RF44Yj8S4RcpQehL-2XMuVsJXwNvK
// BitBucket for gudance: 
    // https://www.youtube.com/playlist?list=PLtV5RF44Yj8S4RcpQehL-2XMuVsJXwNvK

// Main function!!! 
// Every time the window loads, we set defaults and populate the content according to the page type
window.onload = function() { 
  // Setting accessibility menu functions
  document.getElementById("text-size-med").checked = true;
  document.getElementById("theme-colour").checked = true;


  // Checking on what page we are to populate the right content. 
  if (document.getElementsByTagName('title')[0].innerText == "TechUP | Home") {
    // Render the home page articles with metadata
    homePageRender();
    // Update the text content to prevent ugly overflow
    updateParaContent();
    // Render the top comments at the bottom of the home page
    topCommentRender();
  }
  if (document.getElementsByTagName('title')[0].innerText == "TechUP | GPUs") {
    // Render the articel pages with the help of handlebars
    articlesRnder(0);
  }
  if (document.getElementsByTagName('title')[0].innerText == "TechUP | RvB") {
    // Render the articel pages with the help of handlebars
    articlesRnder(1);
  }
  if (document.getElementsByTagName('title')[0].innerText == "TechUP | Cyber") {
    // Render the articel pages with the help of handlebars
    articlesRnder(2);
  }
}

// This function gets called when ever we need to readjust the text location of the article preview
function updateParaContent() {
    // Set the custom bottom values depending in the article height 
    // this is to not have problems with ugly overflow
    let paras = document.getElementsByClassName("art-final-body");
    for (let i = 0; i < paras.length; i++) {
      // get the height and add a small margin
      let heightValue = paras[i].clientHeight+15;
      // set the bottom value to slide the text down
      paras[i].style.bottom =  "-" + heightValue.toString() + "px";
    }
}

// Renders the full article page using handlebars, the JSON data and id to know what to render
function articlesRnder(id) {
  // article render
  let articleTemplate = document.getElementById("full-article").innerHTML;
  let compiledArticleTemplate = Handlebars.compile(articleTemplate);
  let rendered = compiledArticleTemplate(articles_database.articles[id]);
  document.getElementById('article-target').innerHTML = rendered;

  // comment render
  let commentTemplate = document.getElementById("comment-section").innerHTML;
  let compiledComments = Handlebars.compile(commentTemplate);
  renderedComms = "";
  commentRender(articles_database.articles[id].chat, 0, compiledComments);
  document.getElementById('comment-target').innerHTML = renderedComms;

  // set the hero background
  let name = "hero-background-" + id.toString();
  let thing = document.getElementById(name);
  thing.style.backgroundImage = "url('../Media/" + articles_database.articles[id].imageURL +"')";
}

// Renders article previews of the home page
function homePageRender() {
  // Populates the article previews 
  let articleTemplate = document.getElementById("article-template").innerHTML;
  let compiledArticleTemplate = Handlebars.compile(articleTemplate);
  let rendered = compiledArticleTemplate(articles_database);
  document.getElementById('target').innerHTML = rendered;

  // articles background
  for (let i = 0; i < articles_database.articles.length; i++) {
    let imgURL = "url('../Media/" + articles_database.articles[i].imageURL + "')"
    document.getElementById('article-final-'+String(i)).style.backgroundImage = imgURL;
  }
}

// Renders the comments, taking the first level comments only
function topCommentRender() {
  let articleTemplate = document.getElementById("home-top-comments").innerHTML;
  let compiledArticleTemplate = Handlebars.compile(articleTemplate);
  let rendered = compiledArticleTemplate(articles_database);
  document.getElementById('home-comment-target').innerHTML = rendered;
}

// Recursive function to render every comment for the respective article
// Being recursive allows it to render all comments, regardless of the nuber of sub-comments
// or arrangement 
function commentRender(depthObj, depth, compiledComments) {
  // Argument explenation: 
    // depthObj: the current comment object in the JSON file 
    // depth: int to embed the comment depth (number of sub-comment) into the HTML
    // compiledComments: function call to handlebars compile function to compile every individual comment and then 
      // append the returned string to the main renderedComms varibale that will then be passed to overwrite the HTML 
      // resulting in all comments being rendred in a hierarchical structure with HTML properties depending on the depth level
  for (let i = 0; i < depthObj.length; i++) {
    renderedComms += compiledComments(depthObj[i], depth);
    if (depthObj[i].comment.sub_comments.length > 0) {
      commentRender(depthObj[i].comment.sub_comments, depth+1, compiledComments)
    }
  }
}

// Credid to w3schools for guiding me though creating a animation 
// (little to no code is copied, I tried to copy the method and adaped it)
// https://www.w3schools.com/howto/howto_js_animate.asp accessed 4-08-2022
// For as long as the mouse hovers over the articel preview space, the article text will slie up to alow readign
function preview_scroll_up(id) {
  // Fetch the respective article to animate
	activeElement = document.getElementById('article-final-' + id);

  // Set the timer variables for slow scrolling
	interval_id = null;
  clearInterval(interval_id);
  // every 40 mimiseconds the frame function is called
	interval_id = setInterval(frame, 40);

  // get the article height for custom scrolling
  let paras = document.getElementsByClassName("art-final-body");
  let currentPara = paras[id];

  // set the animation values at the start
	let counter = 0;
	let topVal = 0;
  let midVal = 0;
  // value depends on the height of the paragraph
  let botVal = -(currentPara.clientHeight+15);

  // the animation function
	function frame() {
    // if the counter is greater than the heigth of the article we stop and hold
		if (counter > currentPara.clientHeight+15) {
      clearInterval(interval_id);
    // if there is still soace to go we update the location vlaues of the heading, intro paragraph and main article 
		} else {
			activeElement.getElementsByClassName("art-final-head")[0].style.top = String(topVal - counter)+"px";
			activeElement.getElementsByClassName('art-final-para')[0].style.bottom = String(midVal + counter)+"px";
      activeElement.getElementsByClassName('art-final-body')[0].style.bottom = String(botVal + counter)+"px";
      // increment the counter to slowly animate
      counter++;
		}
	}
}

// this function gets called when the mouse moves away from the article (mouseout event)
function preview_scroll_reset(id) {
  // clear the interval
  clearInterval(interval_id);

  // get the height of the current article to have it move down far enough
  let paras = document.getElementsByClassName("art-final-body");
  let currentPara = -(paras[id].clientHeight+15);

  // assign the defualt location vlaues to the header, intro and main article
  activeElement = document.getElementById('article-final-' + id);
  activeElement.getElementsByClassName("art-final-head")[0].style.top = "0px";
  activeElement.getElementsByClassName('art-final-para')[0].style.bottom = "0px";
  activeElement.getElementsByClassName('art-final-body')[0].style.bottom = currentPara.toString() + "px";
}