var menu, menuButton;
var menuLinks = [];
var menuItems = [];
var home, homeOverlay;
var anchorPoints = [];
var anchorLocation = [];
var hideAbleElements = [];
var anchorIndex = 0;
var waiting = false;
var canScroll = false;
var offset = 0;
window.onload = function(){
  menu = document.getElementById("menu");
  menuButton = document.getElementById("menubutton");
  menuLinks = document.getElementsByClassName("js-menu-link");
  menuItems = document.getElementsByClassName("js-menu-item");
  home = document.getElementById("home");
  homeOverlay = document.getElementById("home-overlay");
  hideAbleElements = $(".js-hide");

  // console.log(home.tagName);
  // console.log(menuButton);
  console.log(hideAbleElements);
  
  if(menuLinks.length != menuItems.length){
    document.write("ERROR FIX MENU");
    return;
  }
  
  for(i = 0; i < menuLinks.length; i++){
    menuLinks[i].addEventListener("click", showMenu(i));
  }
  
    anchorPoints = document.getElementsByClassName("js-anchor");

    for(i = 0; i < anchorPoints.length; i++){
        getLocation = anchorPoints[i].getBoundingClientRect();
        getLocation = getLocation.top - offset;

        anchorLocation.push(parseInt(getLocation));
    }

    window.scrollTo(0, 0);
    // console.log(anchorLocation);

    canScroll = true; 
}


function resizeWindow(){
    anchorLocation = [];
    for(i = 0; i < anchorPoints.length; i++){
        getLocation = anchorPoints[i].getBoundingClientRect();
        getLocation = getLocation.top - offset;

        anchorLocation.push(parseInt(getLocation));
    }
    window.scrollTo(0,0);
    anchorIndex = 0;


}

function showMenu(index){
  return function(){
      for(i = 0; i < menuItems.length; i++){
        menuItems[i].style.display="none";
        menuLinks[i].id="";
        if(i == index){
          menuLinks[i].id="active-link";
          menuItems[i].style.display="block";
          menuItems[i].style.opacity = 1;
          
        }
      }
      // console.log(index);
  }
}

function openNav(){
  menuButton.style.display="none";
  menu.style.display="flex";
  home.style.width = "75%";
  homeOverlay.style.opacity = .75;
}

function closeNav(){
  // console.log("closeNav()");
  menu.style.display="none";
  menuButton.style.display="flex";
  home.style.width = "95%";
  homeOverlay.style.opacity = 0;
}

function openProject(project){
  // console.log(anchorLocation[project]);
  canScroll = false;
  hideAbleElements.hide();
  $("#project-wrapper").fadeIn('slow');
  $("#js-project-close").show();
  $("#js-project-close").attr("pos", anchorLocation[project]);
  $("body").css("overflow", "auto");
}

function closeProject(){

  pos = $("#js-project-close").attr("pos");
  console.log(pos);

  $("body").css("overflow", "hidden");
  $("#project-wrapper").hide();
  $("#js-project-close").hide();
  hideAbleElements.show();
  canScroll = true;
  window.scrollTo(0, pos);

}


$(document).on('mousewheel DOMMouseScroll', function (e) {
  if(waiting || canScroll == false){
    return;
  }
  e.preventDefault();//prevent the default mousewheel scrolling
  var active = $('section.active');
  var delta = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;
  waiting = true;
  if (delta < 0) {
    anchorIndex += 1;
    if(anchorIndex > (anchorPoints.length -1)){
      anchorIndex = 0;
    }
    scrollTo({
      top: anchorLocation[anchorIndex],
      left: 0,
      behavior: 'smooth'
    });

    // console.log(anchorIndex);
    // console.log('scrolling down');
  } else {
    anchorIndex -= 1;
    if(anchorIndex < 0){
      anchorIndex = anchorPoints.length - 1;

    }
    scrollTo({
      top: anchorLocation[anchorIndex],
      left: 0,
      behavior: 'smooth'
    });
    // console.log(anchorIndex);
    // console.log('scrolling up');
  }
setTimeout(function(){
  waiting = false;
}, 1000);
});

$(window).on('beforeunload', function(){
  $(window).scrollTop(0);
});