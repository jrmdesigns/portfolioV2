var menu, menuButton;
var menuLinks = [];
var menuItems = [];
var home, homeOverlay;
var anchorPoints = [];
var anchorLocation = [];
var anchorIndex = 0;
var waiting = false;
var canScroll = true;
var offset = 0;
var horizontalSlider = [];
var horizontalSliderIndex = 0;
var horizontalSliderIndexTemp = 0;
var horizontalSliderRightButton;
window.onload = function(){
  menu = document.getElementById("menu");
  menuButton = document.getElementById("menubutton");
  menuLinks = document.getElementsByClassName("js-menu-link");
  menuItems = document.getElementsByClassName("js-menu-item");
  home = document.getElementById("home");
  homeOverlay = document.getElementById("home-overlay");
  console.log(home.tagName);
  console.log(menuButton);
  
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
    console.log(anchorLocation);

  
  
  horizontalSlider = document.getElementsByClassName("js-horizontal-slider");
  horizontalSliderRightButton = document.getElementsByClassName("js-horizontal-button");
  horizontalSlider[horizontalSliderIndex].style.display = "block";
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

      console.log(anchorIndex);
      console.log('scrolling down');
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
      console.log(anchorIndex);
      console.log('scrolling up');
    }
setTimeout(function(){
    waiting = false;
  }, 1000);
  });

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
      console.log(index);
  }
}

function openNav(){
  menuButton.style.display="none";
  menu.style.display="flex";
  home.style.width = "75%";
  homeOverlay.style.opacity = .75;
}

function closeNav(){
  console.log("closeNav()");
  menu.style.display="none";
  menuButton.style.display="flex";
  home.style.width = "95%";
  homeOverlay.style.opacity = 0;
}

function horizontalSliderSetChange(num){
  console.log("ddd");
  horizontalSliderIndexTemp = horizontalSliderIndex;
  horizontalSliderIndex += num;
  if(horizontalSliderIndex < 0){
    horizontalSliderIndex = 0;
  }
  
  if(horizontalSliderIndex > horizontalSlider.length){
    horizontalSliderIndex = horizontalSlider.length-1;
  }
  horizontalSliderMakeChange();
 
}

function horizontalSliderMakeChange(){
    horizontalSlider[horizontalSliderIndexTemp].style.display = "none";
    horizontalSlider[horizontalSliderIndex].style.display="block";
    
    if(horizontalSliderIndex != 0){
      console.log('if');
      canScroll = false;
      menuButton = document.getElementById("menubutton");
     // console.log(menuButton);
     // console.log(menuButton.style.display);
      menuButton.style.display="none";
     // console.log(menuButton.style.display);
    } else{
      console.log('else');
      canScroll = true;
      menuButton.style.display="flex";
      
    }
}