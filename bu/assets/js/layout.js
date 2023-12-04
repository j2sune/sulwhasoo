let flowBoxW = 0; // flowBox Width
    let flowLastW = 0; // flowList - last Width
    let historyBoxW = 0; // historyBoxW Width
    function init() {
      flowBoxWidth()
      historyBoxWidth()
      fullSlide()
    }
    init()

    const intro = $('.intro')
    const introOffset = $('.intro').offset().top
    const introH = $('.intro').innerHeight()

    const cont1 = $('.cont1')
    const cont1offset = $('.cont1').offset().top
    const cont1TopH = $('.cont1-top').innerHeight()
    const cont1Bottom = $('.cont1-full').offset().top
    const cont1BotH = $('.cont1-top').innerHeight()

    const cont2 = $('.cont2')
    const cont2offset = $('.cont2').offset().top
    const cont2H = $('.cont2').innerHeight()
    const flowBoxoffset = $('.cont2-flow').offset().top

    const cont3 = $('.cont3')
    const cont3offset = $('.cont3').offset().top
    const cont3H = $('.cont3').innerHeight()

    const cont4 = $('.cont4')
    const cont4offset = $('.cont4').offset().top
    const cont4Boxoffset = $('.cont4-box').offset().top
    const cont4H = $('.cont4').innerHeight()

    const cont5 = $('.cont5')
    const cont5offset = $('.cont5').offset().top
    const cont5H = $('.cont5').innerHeight()

    const cont6 = $('.cont6')
    const cont6offset = $('.cont6').offset().top
    const cont6H = $('.cont6').innerHeight()

    const cont7 = $('.cont7')
    const cont7offset = $('.cont7').offset().top
    const cont7H = $('.cont7').innerHeight()

    /* cont1 - fullSlide */
    function fullSlide() {
      $('.film-next-btn').click(function() {
        $('.cont1-film').css({'left':'-' + 100 + '%'})
        $('html, body').animate({scrollTop:cont1offset}, 500)
        $('.cont1-film').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
            e.stopPropagation(); 
            return false;
          })
      })
      $('.film-prev-btn').click(function() {
        $('.cont1-film').css({'left':0});
        $('.cont1-film').off('scroll touchmove mousewheel'); 
      })
    }

    /* cont2 - flowBox width */
    function flowBoxWidth() {
      for (f = 0; f < $('.flow-list').length; f++) {
        let flowW = parseInt($('.flow'+(f + 1)).outerWidth(true))
        flowBoxW += flowW
        flowLastW = parseInt($('.flow'+($('.flow-list').length)).innerWidth())
      }
      $('.cont2').css({'height':flowBoxW})
    }

    /* cont6 - historyBox width */
    function historyBoxWidth() {
      for (h = 0; h < $('.history-list').length; h++) {
        let historyW = parseInt($('.history'+(h + 1)).outerWidth(true))
        historyBoxW += historyW
        historyLastW = parseInt($('.history'+($('.history-list').length)).innerWidth())
      }
      $('.cont6').css({'height':historyBoxW})
    }

    $(document).ready(function() {
      /*
      if($(document).scrollTop() > 0) {
        $('html, body').animate({scrollTop:0})
        return false;
      }
      */
    })
    $(document).scroll(function() {
  
      let winH = $(document).scrollTop()
      let winW = $(window).width()

      scrollFixed(winH)
      cont6Scroll(winH)

      // scrollTop, obgTop, obgHeight, contentName
      Motion(winH, introOffset, introH, 'intro')

      if (winW > 640) {
        Motion(winH, cont1offset, cont1TopH, 'cont1Top')
        Motion(winH, cont1Bottom, cont1BotH, 'cont1Bottom')
        Motion(winH, cont2offset, flowBoxW, 'cont2')
        Motion(winH, cont3offset, cont3H, 'cont3')
        Motion(winH, cont4offset, cont4H, 'cont4')
        Motion(winH, cont4Boxoffset, cont4H, 'cont4Box')
        Motion(winH, cont7offset, cont7H, 'cont7')
      } else {
        Motion(winH, cont1offset, cont1TopH, 'm-cont1Top')
        Motion(winH, cont3offset, cont3H, 'm-cont3')
        Motion(winH, cont4offset, cont4H, 'm-cont4')
      }
    })

    function Motion(winH, contTop, contHeight, content) {
      let scrollMin = contTop
      let scrollMax = contTop + contHeight
  
      let min = 1 / (scrollMax - scrollMin)
      let max = -(min * scrollMin)
      let totalRange = (min * winH) + max

      if(content == 'intro') {
        introScroll(totalRange, winH)
      } else if(content == 'cont1Top') {
        cont1Scale(totalRange, winH)
      } else if(content == 'cont1Bottom') {
        opacityScroll(totalRange, winH)
      } else if(content == 'cont2') {
        transScroll(totalRange, winH)
      } else if(content == 'cont3') {
        cont3Scale(totalRange, winH)
      } else if(content == 'cont4') {
        cont4Scroll(totalRange, winH)
      } else if(content == 'cont4Box') {
        cont4BoxLeft(totalRange, winH)
      } else if(content == 'cont7') {
        cont7Scroll(totalRange, winH)
      } else if(content == 'm-cont1Top') {
        Mcont1Scroll(totalRange, winH)
      } else if(content == 'm-cont3') {
        Mcont3Scroll(totalRange, winH)
      } else if(content == 'm-cont4') {
        Mcont4Scroll(totalRange, winH)
      }
    }

    function scrollFixed(winH) {
      $('.scroll-box').bind().unbind().click(function(e) {
        if(winH > 0) {
          e.preventDefault();
          $('html, body').animate({scrollTop:0}, 500)
          return false;
        }
      })

      if(winH > 0) {
        $('.scroll-box').addClass('scroll-inpro')
      } else {
        $('.intro').removeClass('intro-on')
        $('.intro1').css({'opacity':1})
        $('.scroll-box').removeClass('scroll-inpro')
      }
    }
  
    /* intro scroll */
    function introScroll(totalRange, winH) {
      let introRange = totalRange * 5
      if (winH > 0 && winH <= introOffset + introH) {
        if (winH <= introH / 5) {
          $('.intro1').css({'opacity':1 - introRange})
          $('.intro2').css({'opacity':0 + introRange})
          $('.intro2').removeClass('intro2-focus')
          $('.intro').addClass('intro-on')
        } else if (winH <= (introH / 5) * 2) {
          $('.intro1').css({'opacity':0})
          $('.intro2').css({'opacity':1})
          $('.intro3').css({'opacity':0})
          $('.intro-video').removeClass('video-show')
        } else if (winH <= (introH / 5) * 3) {
          $('.intro2').addClass('intro2-focus')
          $('.intro-video').addClass('video-show')
        } else if (winH <= (introH / 5) * 4) {
          $('.intro').addClass('intro-on')
          $('.intro2').css({'opacity':4 - introRange})
          $('.intro3').css({'opacity':(-3) + introRange})
          $('.intro-video').removeAttr('style')
          $('.scroll-box').removeClass('back-white')
        } else if (winH <= introH) {
          $('.intro').removeClass('intro-on')
          $('.intro-list').css({'top':'auto', 'bottom':0})
          $('.intro1').css({'opacity':0})
          $('.intro2').css({'opacity':0})
          $('.intro3').css({'opacity':1})
          $('.intro-video').css({'position':'absolute','top':'auto'})
          $('.intro-video').addClass('video-show')
          $('.scroll-box').addClass('back-white')
        } 
      } else {
        $('.intro-video').removeAttr('style')
        $('.intro-video').removeClass('video-show')
        $('.intro-list').removeAttr('style')
        return
      }
    }

    /* cont1 - scale */
    function cont1Scale(totalRange, winH) {
      if (winH >= cont1offset && winH <= cont1offset + cont1TopH) {
        $('.scroll-box').removeClass('back-white')
        if (totalRange <= 0.75) {
          $('.cont1-back-img').css({'transform':'scale('+ (0.3 + totalRange) +')'});
          $('.cont1-back-img').css({'bottom':17 - (totalRange * 25)+'%'});
        } else {
          return;
        } 
      } else if (winH <= cont1offset) {
        $('.cont1-back-img').prop('style').removeProperty('transform');
        $('.cont1-back-img').prop('style').removeProperty('bottom');
        return
      } else {
        $('.cont1-back-img').css({'transform':'scale(1)'});
        $('.cont1-back-img').css({"bottom":'0'});
        return
      }
    }

    /* Mcont1 - scale */
    function Mcont1Scroll(totalRange, winH) {
      if(winH >= cont1offset && winH <= cont2offset) {
        if (winH >= cont1offset && winH <= cont1offset + cont1TopH) {
          //$('.m-cont1-video video').attr('autoplay', false)
          if (totalRange <= 1) {
            $('.m-cont1-video').css({'position':'fixed','top':'0','bottom':'auto','opacity':totalRange});
            $('.cont1-back-img').css({'position':'fixed','opacity':(1 - totalRange)})
          } else {
            return;
          } 
        } else if (winH >= cont1offset + cont1TopH) {
          $('.cont1-back-img').css({'position':'absolute','opacity':1})
          $('.m-cont1-video').css({'position':'absolute','top':'auto','bottom':'0','opacity':1});
        } else {
          $('.m-cont1-video').removeAttr('style')
          return
        }
      } else {
        $('.cont1-back-img').css({'position':'absolute','opacity':1})
        //$('.m-cont1-video video').attr('autoplay', true)
        return
      }
    }
  
    /* cont1 - opacity */
    function opacityScroll(totalRange, winH) {

      if (winH >= cont1Bottom && winH <= cont1Bottom + cont1BotH) {
        $('.cont1-video .video-dim').css({'background':'rgba(0,0,0,'+ (0.5 + totalRange) +')'});
      } else {
        $('.cont1-video .video-dim').css({'background':'rgba(0,0,0,0.5)'});
        return
      } 
    }

    /* cont2 - transform */
    function transScroll(totalRange, winH) {
      let transMin = cont2offset
      let transMax = cont2offset + flowBoxW
  
      let width1 = flowBoxW / (transMax - transMin)
      let width2 = -(width1 * transMin)
      let widthRange = (width1 * winH) + width2

      if (winH >= cont2offset && winH <= cont2offset + flowBoxW) {
        if(widthRange <= flowBoxW / 2) {
          $('.cont2-flow').css({'transform':'translate(-'+ widthRange  +'px, -'+ totalRange * 100 +'%)'});
        } else {
          return
        }
      } else if (winH <= cont2offset){
        $('.cont2-box').removeAttr('style');
        $('.cont2-flow').prop('style').removeProperty('transform');
        return
      } else {
        return
      }
    }

    /* cont3 - scale */
    function cont3Scale(totalRange, winH) {
      if (winH >= cont3offset && winH <= cont3offset + (cont3H / 2)) {
        if ((totalRange * 2) <= 0.7) {
          $('.cont3-back-img').removeClass('fix')
          $('.cont3-back-img').css({'top':'calc(100vh - '+ (100 - totalRange * 300) +'px)', 'transform':'scale('+ (0.3 + (totalRange * 2)) +')'});
        } else {
          return;
        } 
      } else if (winH >= cont3offset + (cont3H / 2) && winH <= cont3offset + cont3H) {
        $('.cont3-back-img').css({'top':'0', 'transform':'scale('+ (0.5 + totalRange) +')', 'transform-origin':'center center'});
        $('.cont3-back-img').addClass('fix')
      } else if (winH <= cont3offset) {
        $('.cont3-back-img').removeAttr('style');
        $('.cont3-back-img').removeClass('fix')
        return
      } else {
        return
      }
    }

    /* cont4 - backImg */
    function cont4Scroll(totalRange, winH) {
      if (winH >= cont4offset && winH <= cont4offset + (cont4H / 3)) {
        console.log('dd')
        $('.cont3-back-img').css({'top':'0', 'opacity':1- (totalRange * 3)});
        $('.cont4-full-back .video-dim').css({'opacity':1 - ((totalRange * 3) / 2)});
        cont4.addClass('back-on');
        $('.cont4-full-back').removeClass('back-on');
      } else if(winH >= cont4offset + (cont4H / 3)) {
        $('.cont3-back-img').removeClass('fix')
        cont4.removeClass('back-on');
      } else {
        $('.cont3-back-img').css({'opacity':1});
        cont4.removeClass('back-on');
        return
      } 
    }

    /* cont4 - leftBox*/
    function cont4BoxLeft(totalRange, winH) {
      if (winH >= cont4Boxoffset && winH <= cont4offset + (cont4H / 3) * 2) {
        $('.cont4-box').css({'position':'fixed','top':'0','bottom':'auto','left':'-'+totalRange * 300+'%'})
      } else if (winH >= cont4offset + (cont4H / 3) * 2) {
        $('.cont4-box').css({'position':'absolute','top':'auto','bottom':'0','left':-100+'%'})
        if (((totalRange * 300) - 100) <= 100) {
          $('.cont5-back-img').css({'top':-(200 - (totalRange * 300)) +'px', 'transform':'scale('+ (0.3 + ((totalRange - 0.3) * 2)) +')'});
        } else {
          $('.cont5-back-img').css({'top':0, 'transform':'scale(1)'});
          return
        }
      } else {
        $('.cont4-box').prop('style').removeProperty('position');
        $('.cont4-box').css({'left':0})
        return
      }
    }
    
    /* Mcont3 - scale */
    function Mcont3Scroll(totalRange, winH) {
      if (winH >= cont3offset && winH <= cont3offset + (cont3H / 2)) {
        if ((totalRange * 2) <= 1) {
          $('.cont3-back-img').addClass('fix')
          $('.cont3-back-img').css({'top':'0','bottom':'auto','opacity':totalRange * 2});
          $('.cont3-story').addClass('story-fixed') // story-fixed : mobile 스토리박스 fixed
          $('.cont3-story').css({'opacity':(1 - totalRange)})
        } else {
          return;
        } 
      } else if (winH >= cont3offset + (cont3H / 2) && winH <= cont3offset + cont3H) {
        $('.cont3-back-img').css({'top':'0', 'transform':'scale('+ (0.5 + totalRange) +')', 'transform-origin':'center center', 'opacity':1});
      } else if (winH <= cont3offset) {
        $('.cont3-back-img').removeAttr('style');
        $('.cont3-story').removeClass('story-fixed');
        $('.cont3-story').removeAttr('style')
      } else {
        $('.cont3-story').removeClass('story-fixed');
        return
      }
    }

    /* Mcont4 - backImg */
    function Mcont4Scroll(totalRange, winH) {
      if(winH >= cont4offset && winH <= cont4offset + cont4H) {
        if (winH >= cont4offset && winH <= cont4offset + (cont4H / 3)) {
          $('.cont3-back-img').css({'top':'0','opacity':1 - ((totalRange * 3) * 2)})
          $('.cont4-box').addClass('full-fixed')
          if ((totalRange * 3) <= 0.5) {
            $('.cont4-full-back .video-dim').css({'opacity':1 - (totalRange * 3)})
            $('.cont4-full .full-bg-txt').css({'opacity':(totalRange * 3) * 2})
          } else {
            $('.cont4-full-back .video-dim').css({'opacity':0.5})
            $('.cont4-full .full-bg-txt').css({'opacity':1})
            return
          }
        } else if(winH >= cont4offset + (cont4H / 3)) {
          $('.cont3-back-img').removeClass('fix')
          $('.cont4-box').removeClass('full-fixed')
        }
      } else {
        $('.cont3-back-img').addClass('fix')
        $('.cont4 .full-bg-txt').removeAttr('style')
        $('.cont4-box').removeClass('full-fixed')
        return 
      }
    }

    /* cont6 - rowSlide */
    function cont6Scroll(winH) {
      let width1 = (historyBoxW * 2) / ((cont6offset + historyBoxW) - cont6offset)
      let width2 = -(width1 * cont6offset)
      let widthRange = (width1 * winH) + width2

      if (winH >= cont6offset && winH <= cont6offset + cont6H) {
        $('.history-box').css({'transform':'translate(-'+ widthRange +'px, 0'});
        if(widthRange <= (historyBoxW / 2) + (historyLastW / 2)) {
          //$('.history-box').css({'transform':'translate(-'+ widthRange +'px, 0'});
        }
      }
    }

    /* cont7 - scroll */ 
    function cont7Scroll(totalRange, winH) {
      if(winH >= cont7offset - (cont7H / 3) && winH <= cont7offset) {
        $('.cont7-video').addClass('fix')
        $('.cont7-full-back .video-dim').css({'opacity':0.5 - (totalRange / 2)})
      } else if (winH <= cont7offset - (cont7H / 3)) {
        $('.cont7-video').removeClass('fix')
        $('.cont7-full-back .video-dim').removeAttr('style')
        return
      }

      if (winH >= cont7offset && winH <= cont7offset + cont7H) {
        $('.cont7-video').removeClass('fix')
        $('.cont7-full-back .video-dim').css({'opacity':0.5})
        if (winH <= cont7offset + (cont7H / 3)) {
          $('.cont7-full').addClass('cont7-sticky')
          $('.cont7-full .txt-first').css({'opacity':1 - (totalRange * 3 )})
          $('.cont7-full .txt-next').css({'opacity':totalRange * 3})
          $('.cont7-full-txt').removeAttr('style')
        } else if (winH <= cont7offset + ((cont7H / 3) * 2)) {
          console.log(totalRange)
          if ((totalRange * 3 ) <= 100) {
            $('.cont7-full').css({'opacity':1 - (totalRange * 3)})
            $('.cont7-full-txt').css({'position':'fixed', 'opacity':(totalRange * 3)})
          } else {
            $('.cont7-full').css({'opacity':1})
            $('.cont7-full-txt').css({'position':'fixed', 'opacity':0})
          }
        }
      } else {

      }
    }