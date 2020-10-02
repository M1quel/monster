var content = document.querySelector(".content");

let contentStartWidth = window.getComputedStyle(content, null).getPropertyValue("width");
let firstStepScrollDist = 1200; //px
let firstStepMax = 85; //vh 
let distanceToSide = content.getBoundingClientRect().left * 2;
let scroller = document.querySelector(".scrollOverlay");
let scrollerOffsetter = document.querySelector(".scrollContent")

let secondStepScrollRange = 400;
let secondStepminScale = 0.8;
let secondStepMaxScrollDist = 500



scroller.addEventListener("scroll", firstStep)

function firstStep(){
    let rect = scrollerOffsetter.getBoundingClientRect();
    let scrolledDist = rect.top * -1;
    if (scrolledDist <= 0) {
        scrolledDist = 0;
        if (document.getElementById('info-box').getAttribute("data-scroll-direction") == "UP") {
            return
        }
    }
    if (scrolledDist > firstStepScrollDist) {
        content.style.marginTop = 0;
        content.style.width = "100%";
        secondStep()
        return
    }
    let pctScrolledDist = scrolledDist / firstStepScrollDist;
    let pulledFromStep = firstStepMax * pctScrolledDist;
    let amountToBeAddedWidth = distanceToSide * pctScrolledDist;
    content.style.width = (parseInt(contentStartWidth) + parseInt(amountToBeAddedWidth)) + "px"
    content.style.marginTop = (firstStepMax - pulledFromStep) + "vh";
    
    
    
    function secondStep(){
        let maxScaleDown = .3;
        let num = (rect.top * -1) - firstStepScrollDist;
        let number = num / secondStepMaxScrollDist;
        let scaleToRemove = maxScaleDown * number;
        if (scrolledDist >= (firstStepScrollDist + secondStepMaxScrollDist)) {
            thirdStep()
            return
        }
        content.style.transform = `scale(${1-scaleToRemove})`
        
    }


    function thirdStep(){
        let maxOffsetChange = 40;
        let maxScroll = 500;
        let num = (rect.top * -1) - (firstStepScrollDist + secondStepMaxScrollDist);
        let number = num / maxScroll;
        let amountToRemove = maxOffsetChange * number;
        content.style.marginTop = (0 - amountToRemove) + "vh";

    }

}


// Initial state
var scrollPos = 0;
// adding scroll event
scroller.addEventListener('scroll', function(){
  // detects new state and compares it with the new one
  if ((scrollerOffsetter.getBoundingClientRect()).top > scrollPos)
		document.getElementById('info-box').setAttribute('data-scroll-direction', 'UP');
	else
		document.getElementById('info-box').setAttribute('data-scroll-direction', 'DOWN');
	// saves the new position for iteration.
	scrollPos = (scrollerOffsetter.getBoundingClientRect()).top;
});