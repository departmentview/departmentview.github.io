$(document).ready(function () {

    $('img.img-svg').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
          var $svg = $(data).find('svg');
          if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
          }
          $svg = $svg.removeAttr('xmlns:a');
          if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
          }
          $img.replaceWith($svg);
        }, 'xml'); 
      });

    document.querySelector(".catalog__title").style.opacity = 1
    setTimeout(function(){
        document.querySelector(".row").style.opacity = 1
    },300)

    var row = document.querySelector(".row")
    var redisign = 0;
    var chooseType = 0;
    var chooseName;
    var id = "none";
    var choose = 0;
    var count = 0;

    function chosen(element){
        element.style.transform = "translateY(5px)"
        var result = element.innerHTML + '<div class="box"></div>'
       
        element.innerHTML = result

        // document.querySelector(".box").style.transform = 'translateY(-5px)'
        // setTimeout(() => {
        //     document.querySelector(".box").style.opacity = 0.4
        // }, 300);

        // element.querySelector('.box').style.opacity = 0.4
    }

    function unchosen(element){
        element.style.transform = "translateY(0px)"
        var result = element.innerHTML
        str = '<div class="box"></div>'
        result = result.replace(str, '')
        element.innerHTML = result
    }

    function style(element){
        var color
       
        if(element.id=="landing"){
            color = "#007023"
        }else if(element.id=="company"){
            color = "#0084FF"
        }else if(element.id=="shop"){
            color = "#A22B39"
        }else if(element.id=="info"){
            color = "#4332B2"
        }

        var stroke = document.querySelectorAll('.cls-1')
        var i
        for(i = 0; i < stroke.length; i++){
            stroke[i].style.stroke = color;
        }
        document.querySelector('.input__file').style.color = color;
            
        document.querySelector('.line_go').style.opacity = 1;
        document.querySelector('.line_go').style.backgroundColor = color;
        document.querySelector('.link').style.color = color;
        shadow = "4px 4px" + color;
        document.querySelector('.purchase__dragdrop').style.boxShadow = shadow;
    }

    



    document.querySelectorAll('.column').forEach(element => {
        element.addEventListener('click', function () {

            if (element.id == "redisign") {
                if (redisign == 0) {
                    if (choose == 1) {
                        unchosen(document.getElementById(id))
                        choose = 0;
                    }
                    chosen(element)
                    document.querySelector('.alert').style.transform = 'translateY(5px)'
                    setTimeout(() => {
                        document.querySelector('.alert').style.opacity = 1;
                    }, 300);
                    
                    redisign = 1;
                } else if (redisign == 1) {
                    if (choose == 1) {
                        unchosen(document.getElementById(id))
                        choose = 0;
                    }
                    unchosen(element)
                    redisign = 0;
                    document.querySelector('.alert').style.opacity = 0;
                }
                
            }

            if (element.id != "redisign") {
                if (id == "none") {
                    // element.style.border = "2px solid purple"
                    id = element.id
                    choose = 1;
                    chosen(element)
                    style(element)

                } else if (element.id == id) {
                    // element.style.border = "0px solid purple"
                    id = "none"
                    choose = 0;
                    unchosen(element)

                } else if (element.id != id) {
                    // document.getElementById(id).style.border = "0px"
                    unchosen(document.getElementById(id))
                    // element.style.border = "2px solid purple"
                    id = element.id
                    choose = 1;
                    chosen(element)
                    style(element)
                }
                var siteType = element.textContent


                if (redisign == 1) {
                    var result = element.querySelector(".column__title").textContent + " | Редизайн"
                } else if (redisign == 0) {
                    var result = element.querySelector(".column__title").textContent
                }
                count++
                
            }


            if(result){
                document.querySelector(".choose").innerHTML = result;
            } else {
                document.querySelector(".choose").innerHTML = "Не выбран";
            }

            // var el = document.getElementById('choose');
            // el.scrollIntoView({behavior: "smooth", block:"center"});

            if (count == 1) {
                $('html, body').stop().animate({
                    scrollTop: $("#choose").offset().top - 0
                }, 530);
            }

        });
    });

})
