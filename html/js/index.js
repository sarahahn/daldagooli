// index.html

$(document).ready(function(){

  countDown('2022/11/20  23:59:59');
  menuSlide();
  headerfix();
  autoSlide();
  reviewSlide();
  seasonEvt();
  mobileBtn();
  mobileNav();



  $(window).resize(function(){
    seasonEvt();
  })


  
  // 1. 카운트 시작
  function countDown(dDay){
    


    var countDate = new Date(dDay).getTime();
    // console.log(countDate);

    var second = 1000; // 1초
    var minute = second * 60; //1분
    var hour = minute * 60;
    var day = hour * 24;



    var timer = setInterval(function(){

      var nowTime = new Date().getTime() //현재시간을 알애내서 지정한 시간에서 빼준다.
      var distance = countDate - nowTime;
      // console.log(distance);

      
    var disD = Math.floor(distance/day);
    // console.log(disD)
    var disH = Math.floor( (distance%day)/hour );
    // console.log(disH)
    var disM = Math.floor( (distance%hour)/minute );
    // console.log(disM)
    var disS = Math.floor( (distance%minute)/second );
    // console.log(disS)


    // if조건이 먼저 실행되고 0으로 나타나라고 해야한다!
    if(disD < 0){
      disD = 0;
      disH = 0;
      disM = 0;
      disS = 0;
      clearInterval(timer);
    }


    $('.count').text( (disH < 10 ? '0' : '') + disH + ' : ' + (disM < 10 ? '0' : '') + disM + ' : ' + (disS < 10 ? '0' : '') + disS)


    },1000)//timer();

  }//countDown();





// 2. nav.gnb 시작

function menuSlide(){

  var $mainMenu = $('.mainMenu').find('a');
  var $subMenu = $('.subMenu');

    // 기본값
    $subMenu.slideUp(0)

  $mainMenu.on("mouseenter", onMenu);
  $mainMenu.on("mouseleave", outMenu);

  function onMenu(){

    $subMenu.stop()
      $(this).parent().find('.subMenu').slideDown(200)
  }//onOver

  function outMenu(){
    $subMenu.stop();
    $subMenu.slideUp(300);
  }//outMenu


}//menuSlide();





// 3. header고정

function headerfix(){

  var $header = $('header');
  var $scrollTop;
  var $videoHeight = $('#video').innerHeight();
  // console.log($videoHeight);
  // console.log($header);
  // console.log($scrollTop);

  $(window).on('scroll', onScroll)

  function onScroll(){
    $scrollTop = $(window).scrollTop();
    // console.log($scrollTop)
    if($scrollTop >= $videoHeight){
      $header.addClass('on')
    }else{
      $header.removeClass('on')
    }

  }


}//headerfix();






// 4. TimeSlae thumnail자동 슬라이드

// -. thumnail의 가로 길이 확인하고, 
// -. 썸네일(li)의 갯수 확인
// -. 가로길이와 li의 갯수를 곱하여 
// -. 썸네일을 가로로 늘여뜨려주고(float)
// -. append로 맨 뒤에 첫번째 li가 오도록 붙여줌
// -. 옆으로 이동하는 값 구해주기
// -. timer 설정하여 자동으로 위치값을 변하게끔 해준다.

function autoSlide(){

  var $thumWidth = $('.tThum').innerWidth();
  var $ulInner = $('.ulInner').innerWidth()
  //console.log($ulInner);//790
  var $thumSize = $('.tThum').children().size();
  //console.log($thumSize);//4
  var $tThum = $('.tThum'); //ul
  var $timer;
  var overNum = 0;

  $tThum.css({'width' : $thumWidth * $thumSize});
  $tThum.children().last().prependTo($tThum);
  $tThum.css({'left':-$ulInner})
  // 순서를 맞춰주기 위해 앞에 사진 하나 놓아주고, 시작해야 하기 때문에 
  // last사진을 $thum앞에 붙여줘! 한다.

  //console.log($tThum.css('width')); //3160px
  $tThum.children().css({'width':($thumWidth * $thumSize) / $thumSize });


  autoStart();

  function onplay(){
    $currentPosition = $tThum.position().left;
    /*
   // console.log($currentPosition);//0
    if(overNum < $thumSize -1){
      overNum ++
      console.log(overNum)

    }else{
      overNum =0
    }
    $tThum.stop().animate({'left': -$ulInner * overNum},500)
*/
  

  $tThum.stop();
  $tThum.animate({'left' : $currentPosition - $ulInner}, 500, 'easeOutCubic', function(){
  $tThum.children().first().appendTo($tThum);
  $tThum.css({'left':-$ulInner})
  // 한바퀴 돌고나면 앞에 있는 first사진을 $thum뒤에 붙여줘!! 한다.
  //그리고서 left값을 땡겨준다.

  });

}// onPlay();


function autoStart(){
  $timer = setInterval(onplay, 2000);
};


}//autoSlide();









// 5.  review slide

function reviewSlide(){
  var $currentLeft = 0;
  var $firstNum = 1;
  var $lastNum;
  var $itemCount = 0;
  var $reviewList = $('.review_list').children()
  var $reviewSize = $('.review_list').children().size();

  var $reviewUl = $('.review_list'); //ul
  //$reviewUl.css({'width' : $reviewSize * $liInner});

  var $itemFirst;
  var $itemLast;



  $reviewList.each(function(){
    $(this).css({'left':$currentLeft})
    $currentLeft += $(this).innerWidth()+30
    $(this).attr("id", "item"+(++$itemCount));
  })

  if($itemCount > $reviewSize-1){
    $lastNum = $itemCount;

    setInterval(function(){
      $reviewList.each(function(){
        $(this).css({'left':$(this).position().left-0.5})//px기준
        $itemFirst = $('#item' + $firstNum);
        $itemLast = $('#item' + $lastNum);

        if($itemFirst.position().left < -$reviewList.innerWidth()){
          $itemFirst.css({'left':$itemLast.position().left + $itemLast.innerWidth()+30})

          $firstNum++;
          $lastNum ++;

          if($lastNum > $itemCount){
            $lastNum = 1;
          }else if($firstNum >  $itemCount){
            $firstNum = 1;
          }
        }
      },5000)


    })
  }


  


}//reviewSlide







// 6. seasonProduct 버튼이벤트

// li의 width값을 구하고, 갯수를 구해서
// ul의 값 = li'width * li'size
// 버튼 이벤트 실행


  
function seasonEvt(){
  var $maxWidth = $(window).innerWidth();
  console.log($maxWidth) //값받아옴

if($maxWidth < 900){
  
  mwautoSlide();
}
  // 반응형 900일 때 자동슬라이드 되거라! 

function mwautoSlide(){
  setInterval(onNextSlide, 2000)


}//mwautoSlide();

  var $visualInner = $('.seasonInner').innerWidth();
  //console.log($visualInner) //1200
  var $seasonUl = $('.seasonProduct_list'); //ul
  var $seasonSize = $seasonUl.children().size();
  //console.log($seasonSize);//3

  $seasonUl.css({'width' : $visualInner * $seasonSize})
  //console.log($seasonUl.css('width')) // ul값을 3600으로 늘리기

  var $seasonLi = $seasonUl.children(); //li
  $seasonLi.css({'width' : $visualInner})
 // console.log($seasonLi.css('width'))// li width값을 1200으로 잡음.
 //$productLi.css({'width' : ($visualInner * $productSize) / $productSize})

 $seasonUl.children('li').last().prependTo($seasonUl);
 $seasonUl.css({'marginLeft':'-100%'});
 /*
 버튼 슬라이드가 실행되기 전에, 
li앞에 하나의 li를 더 붙여주고, 
marginLeft -100%를 주어 가운데 li가 보이게끔 한다.
그리고서, 버튼 이벤트를 시작한다.
 */

 var $seasonLiWidth = $seasonUl.children().innerWidth();
 console.log($seasonLiWidth);//1200 - li길이값
  

  // 이벤트 시작
  $('.nextBtn').on('click', onNextSlide)
  $('.prevBtn').on('click', onPrevSlide)

  // 1. onNextSlide
 function onNextSlide(){
  console.log('11')
  $seasonUl.stop().animate({'marginLeft':'-200%'},500,function(){
    $seasonUl.children('li').first().appendTo($seasonUl);
    $seasonUl.css({'marginLeft':'-100%'})

  });

  return false;
  // onclick이벤트 없애기 위함


/*
설명 : 

클릭했을 때, marginLeft를 -200%만큼 앞으로 이동해야 다음 값이 보인다.
(현재 -100%만큼 이동해 있으니까!!!)
그 이후에, 맨 앞에 있는 첫번째 요소를 ul의 뒤에 붙여주는데, 이러면 또 마진값이 변경되니까
marginLeft -100%로 다시 자리를 잡아준다.
*/





}; // onNextSlide();





  // 2.  onPrevSlide
  function onPrevSlide(){
    $seasonUl.stop();
    $seasonUl.animate({'marginLeft' : '0'}, 500, function(){
      $seasonUl.children('li').last().prependTo($seasonUl);
      $seasonUl.css({'marginLeft':'-100%'});
    })

    return false;
      // onclick이벤트 없애기 위함


      
/*
설명 : 

onNextSlide와 같이, 클릭했을 때, marginLeft를 0으로 주어 앞에 있던 값을 보이게 한다.
(현재 -100%만큼 이동해 있으니까!!!  0이 되어야 앞의 요소가 보이는 것, -100이 아님!!!!! )
그 이후에, 맨 뒤에 있는 마지막 요소를 ul의 앞에 붙여주는데, 이러면 또 마진값이 변경되니까
marginLeft -100%로 다시 자리를 잡아준다.
*/





  }; //onPrevSlide();









  

}//seasonEvt();

  








// 7. mobileBtn시작

function mobileBtn(){

  var $isOpen = false;

  $('.mobileWrap').fadeOut(0)


  $('.mobileBtn').on('click', onMenuActive);

    function onMenuActive(){

      if($isOpen == false){
        
        $('.line02').addClass('on');
          setTimeout(function(){
          $('.line01').addClass('on')
          $('.line03').addClass('on')
        }, 200)// setTimeout
  
      setTimeout(function(){
        $('.mobileBtn').children().addClass('on')
      },400)// setTimeout
  
      //setInterval : 몇초에 한번 실행하라
      //setTimeout : 몇초 뒤에~실행하라

      $('.mobileWrap').fadeIn(300)
   
      




      $isOpen = true;
      return false;

      }
      else if($isOpen == true){
        $('.line01').removeClass('on');
        $('.line02').removeClass('on');
        $('.line03').removeClass('on');
        $('.mobileBtn a').removeClass('on');
 

 
        $('.mobileWrap .mSubMenu').slideUp(0); // (0)는 시간
        $('.mobileWrap > ul > li').removeClass('on'); //메뉴 닫았을 때 모든 메뉴가 닫힘으로 초기화되도록!
 
        $('.mobileWrap').fadeOut(300)
 
       $isOpen = false;
       return false;
      }
  
    }//onMenuActive();


}// mobileBtn();





// 8. mobileNav시작

function mobileNav(){
  
  $('.mobileGnb .mSubMenu').slideUp(0);
  $('.mobileGnb .mMainMenu > li').on('click', onSubNav)

  function onSubNav(){
    
    var isMenu = $(this).children('.mSubMenu').is(':hidden');


    if(isMenu){
      $('.mobileGnb .mSubMenu').slideUp(0);
      $(this).children('.mSubMenu').slideDown(300);
    }
    else{
      $('.mobileGnb .mSubMenu').slideUp(300)
    }

    return false;

  }

}//mobileNav();




















});// document 끝


