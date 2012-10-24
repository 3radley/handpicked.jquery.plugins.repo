(function($){$(document).ready(function(){var interval,wrapper,slides,currentSlideIndex=0,sliderWidth,sliderHeight,slideDuration=5000,transition_duration=500;var arrowsNext,arrowsPrev;var pagers;var playButton;init();events();startInterval();var direction=0;$(".pristine-slide").css({"z-index":1,"opacity":0});$("#pristine-slide-1").css({"z-index":99,"opacity":1});function transitionIn(index){var slide=$(slides[index]);$(".pristine-slide").css({"z-index":1});slide.css({"z-index":99}).stop().animate({"opacity":1},500);}function transitionOut(index){var slide=$(slides[index]);setTimeout(function(){slide.css({"opacity":0});},500);}function events(){arrowsNext.on("click",function(){pause();goForward();});arrowsPrev.on("click",function(){pause();goBackwards();});pagers.on("click",function(){pause();goAt(parseInt($(this).attr("id").replace("pristine-pager-",""))-1);});playButton.on("click",function(){startInterval();playButton.animate({"opacity":0},400);});}function init(){wrapper=$(".pristine-wrap");slides=$(".pristine-slide");pagers=$(".pristine-pager");arrowsNext=$(".pristine-arrow-next");arrowsPrev=$(".pristine-arrow-prev");playButton=$(".pristine-play");sliderWidth=$(".pristine-wrap").width();sliderHeight=$(".pristine-wrap").height();arrowsNext.not(arrowsNext.first()).hide();arrowsPrev.not(arrowsPrev.first()).hide();setActivePager(0);playButton.css({"opacity":0});}function startInterval(){clearInterval(interval);interval=setInterval(function(){goForward();},slideDuration);}function pause(){clearInterval(interval);playButton.animate({"opacity":1},400);}function goForward(){transitionOut(currentSlideIndex);currentSlideIndex=(currentSlideIndex==slides.length-1)?0:currentSlideIndex+1;transitionIn(currentSlideIndex);updateUI();}function goBackwards(){transitionOut(currentSlideIndex);currentSlideIndex=(currentSlideIndex==0)?slides.length-1:currentSlideIndex-1;transitionIn(currentSlideIndex);updateUI();}function goAt(index){transitionOut(currentSlideIndex);currentSlideIndex=index;transitionIn(currentSlideIndex);updateUI();}function updateUI(){setActivePager(currentSlideIndex);}function setActivePager(index){pagers.css({"background":"#ccc"});$(pagers[index]).css({"background":"#888"});}});})(jQuery);