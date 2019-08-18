$( function(){
    var ammo             = $( '.ammo' ),
        dog              = $( '.dog' ),
        timer            = $( '.timer' ),
        text             = $( '.text' ),
        flyContainer     = $( '.duck-fly-container' ),
        shotDuckCounter  = 0,
        aliveDuckCounter = 0,
        newX             = 0,
        newY             = 0,
        endGame          = false,
        maxHeight        = parseInt( flyContainer.css('height') ) - 95,
        maxWidth         = parseInt( flyContainer.css('width') ) - 104,
        flyClasses       = ['duck_fly_left', 'duck_fly_top_left', 'duck_fly_right', 'duck_fly_top_right'],
        ducks,
        bullets,
        flyInterval;
    //старт игры
    $( '.start-btn' ).on('click', function(){
        $( this ).hide();
        text.text( '' );
        //движение собаки на старте
        $( '#dogWalk' )[0].play();
        dog
            .addClass( 'dog_walk' )
            .css({ transform: 'translate(45vw, 0px)' });
        setTimeout( function(){
            dog
                .removeClass( 'dog_walk' )
                .addClass( 'dog_snuff' );
            setTimeout(function(){
                let dogBark = setInterval(function(){
                    $( '#dogBark' )[0].pause();
                    $( '#dogBark' )[0].currentTime = 0;
                    $( '#dogBark' )[0].play();
                },300);
                setTimeout(function(){
                    clearInterval(dogBark);
                },900);
                dog
                    .removeClass( 'dog_snuff' )
                    .addClass( 'dog_jump' )
                    .css({ transform: 'translate(47vw, -100px)' })
                    .on('transitionend', function(){
                        dog.css({
                            MsTransform: 'translate(48vw, 0px)',
                            transform: 'translate(48vw, 0px)',
                            transition: 'transform 1s',
                            zIndex: '4'
                        });
                    });
            },900);
        },5400);
        // запуск игры после движения собаки
        setTimeout(function(){
            Timer(10);
            startGame(2, 3);
            flyContainer.on('click', shoot.bind(event));
        },9000);
    });
    //функция создания и перемещения объектов
    function startGame (ducksCount, bulletsCount) {
        //создание уток
        for (let i = 1; i <= ducksCount; i++) {
            $( '<div>', { class: 'duck gs alive' }).appendTo( flyContainer );
        }
        //создание пуль
        for (let i = 1; i <= bulletsCount; i++) {
            $( '<div>', { class: 'bullet gs available' }).appendTo( ammo );
        }
        ducks = $( '.alive' );
        aliveDuckCounter = ducks.length;
        bullets = $( '.available' );
        ducks.addClass( 'duck_fly' );
        //движение уток
        flyInterval = setInterval(function () {
            ducks
                .removeClass( flyClasses.join( ' ' ) )
                .each( function( index ){
                    if ( $( this ).hasClass( 'shot' )) return;
                    newX = Math.floor(Math.random() * maxWidth);
                    newY = Math.floor(Math.random() * maxHeight);
                    $( this ).css({
                        left: newX + 'px',
                        bottom: newY + 'px'});
                    if ( newX < parseInt( $( this ).css( 'left' ))) {
                        if ( newY <= parseInt( $( this ).css( 'bottom' ) + 50) ) {
                            $(this).addClass( 'duck_fly_left' );
                        } else {
                            $(this).addClass( 'duck_fly_top_left' );
                        }
                    } else {
                        if ( newY <= parseInt( $( this ).css( 'bottom' ) + 50) ) {
                            $(this).addClass( 'duck_fly_right' );
                        } else {
                            $(this).addClass( 'duck_fly_top_right' );
                        }
                    }
                });
        }, 600);
    }
    //функция выстрела и попадания/непопадания
    function shoot () {
        if ( bullets.length < 1 || endGame ) {
            return;
        }
        $( '#shot' )[0].pause();
        $( '#shot' )[0].currentTime = 0;
        $( '#shot' )[0].play();
        bullets.eq( bullets.length - 1 ).removeClass( 'available' );
        bullets = $( '.available' );
        var duck = $(event.target);
        if (duck.hasClass('alive')) {
            duck
                .removeClass( 'alive ' + flyClasses.join(' ') )
                .addClass('shot')
                .offset(duck.position());
            shotDuckCounter++;
            aliveDuckCounter--;
            setTimeout(function () {
                duck.addClass( 'falling' )
                    .css({ top: 100 + 'vh', transition: 'top 1s linear 0s' });
            }, 300);
        }
    }
    //функция времени и условия окончания
    function Timer (seconds) {
        if (seconds > 9) {
            timer.text(function( index, text ){
                return text = '00:' + seconds.toString();
            });
        } else {
            timer.text(function( index, text ){
                return text = '00:0' + seconds.toString();
            });
        }
        setTimeout(function () {
            if (seconds < 1) {
                endOfGame();
                endGame = true;
                return;
            } else if (aliveDuckCounter == 0 || bullets.length == 0) {
                endGame = true;
                endOfGame();
                return;
            }
            seconds--;
            Timer(seconds);
        }, 1000);
    }
    //функция завершения игры
    function endOfGame () {
        var delay = 2000;
        timer.hide();
        ammo.hide();
        clearInterval(flyInterval);
        ducks = $( '.alive' );
        ducks.each(function(){
            $( this )
                .addClass('duck_fly_top_right')
                .css({
                    bottom: 'calc(100vh + 100px)',
                    left: parseInt($(this).css( 'left' )) + 200 + 'px'
                })
        });
        setTimeout(function(){
            dog.removeClass('dog_jump');
            //пес отображает результат
            switch(shotDuckCounter) {
                case 0:
                    dog.addClass( 'no_ducks' );
                    setTimeout( function () { $( '#dogLaungh' )[0].play(); }, 1000 );
                    delay = 4000;
                    break;
                case 1:
                    dog.addClass( 'show_duck' )
                        .css({ 'transform': 'translate(48vw, - 100px)' });
                    setTimeout( function () { $( '#dogGotDuck' )[0].play(); }, 100 );
                    break;
                default:
                    dog.addClass( 'show_ducks' )
                        .css({ 'transform': 'translate(48vw, - 100px)' });
                    setTimeout( function () { $( '#dogGotDuck' )[0].play(); }, 100 );
                    break;
            }
            //конечная информация
            setTimeout(function(){
                $( '.wrapper' ).css({ backgroundColor: '#660BAB' });
                $( '#gameOver' )[0].play();
                $( '<p>' ).appendTo( text ).addClass( 'game-over-text').text('Конец игры!!!');
                $( '<p>' ).appendTo( text ).text('Вы набрали ' + shotDuckCounter * 500 + ' очков!');
                $( '.restart-btn' ).show().click(function() { location.reload(); });
            },delay);
        }, 1000);
    }
});