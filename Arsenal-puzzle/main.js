$(document).ready(function () {
    let time;
    let seconds = 60;
    let numbers = [];
    let area = [
        ['0 0', 1],
        ['-100px 0', 2],
        ['-200px 0', 3],
        ['-300px 0', 4],
        ['0 -100px', 5],
        ['-100px -100px', 6],
        ['-200px -100px', 7],
        ['-300px -100px', 8],
        ['0 -200px', 9],
        ['-100px -200px', 10],
        ['-200px -200px', 11],
        ['-300px -200px', 12],
        ['0 -300px', 13],
        ['-100px -300px', 14],
        ['-200px -300px', 15],
        ['-300px -300px', 16]
    ];
    let randomNum = () => Math.round(Math.random() * 15);
    let num;
    let puzzleArray = document.getElementsByClassName('puzzle');

    function randomizer() {
        while (numbers.length < 17) {
            num = randomNum();
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
            if (numbers.length == 16) {
                break;
            }
        }
        console.log(numbers);
        for (let i = 0; i < puzzleArray.length; i++) {
            puzzleArray[i].style.backgroundPosition = area[numbers[i]][0];
            puzzleArray[i].setAttribute('data-number', area[numbers[i]][1]);
        }
        numbers = [];
    }
    randomizer();
    $('.newGame').click(function () {
        randomizer();
        $('.start').removeClass('disabled-btn').attr('disabled', false);
        $('.check').addClass('disabled-btn').attr('disabled', true);
        clearInterval(time);
        seconds = 60;
        $('.minutes').html(`01:`);
        $('.seconds').html(`00`);
        $('.info ~ span').css('display', 'inline-block');
        $('#modal-check').css('display', 'block');
        $('.puzzle').css('visibility', 'visible');
        $('.drop-block').css({
            backgroundImage: '',
            backgroundPosition: ''
        });
        $('.puzzle').on({
            click: function () {
                time = setInterval(timer, 1000);
                $('.start').addClass('disabled-btn').attr('disabled', true);
                $('.check').removeClass('disabled-btn').attr('disabled', false);
                $('.puzzle').off('click');
            }
        })
    })

    function timer() {
        seconds--;
        $('.minutes').html(`00:`);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (seconds == 0) {
            clearInterval(time);
            $('.block').css('z-index', -1);
            $('.btn-wrapper').css('z-index', -1);
            $('.modal-bg').animate({
                zIndex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.6)'
            })
            $('.info').text(`It's a pity, but you lost`);
            $('.info ~ span').css('display', 'none');
            $('#modal-check').css('display', 'none');
            $('.check').addClass('disabled-btn').attr('disabled', true);
            $('.modal-window').css({
                zIndex: 10
            }).fadeIn().animate({
                top: '-25px',
            }, 300)
        }
        $('.seconds').html(`${seconds}`);
    }

    $('.start').click(function () {
        $(this).addClass('disabled-btn').attr('disabled', true);
        $('.check').removeClass('disabled-btn').attr('disabled', false);
        time = setInterval(timer, 1000);
        $('.puzzle').off('click');
    })

    $('.puzzle').on({
        click: function () {
            time = setInterval(timer, 1000);
            $('.start').addClass('disabled-btn').attr('disabled', true);
            $('.check').removeClass('disabled-btn').attr('disabled', false);
            $('.puzzle').off('click');
        }
    })

    let currentPosition;
    let currentElement;

    $('.puzzle').draggable({
        containment: '.block-wrapper',
        revert: true,
        start: function () {
            let currentPuzzle = getComputedStyle(this);
            currentElement = this;
            currentPosition = currentPuzzle.backgroundPosition;
        }
    })

    $('.drop-block').droppable({
        accept: '.puzzle',
        drop: function () {
            let bg = getComputedStyle(this);
            if (bg.backgroundPosition == '0% 0%') {
                $(this).css({
                    backgroundImage: 'url(./images/Arsenal.png)',
                    backgroundPosition: currentPosition
                }).attr('data-number', currentElement.dataset.number)
                $(currentElement).css('visibility', 'hidden');
                $('.block').sortable({})
            }
        }
    });

    $('.check').click(function () {
        $('.block').css('z-index', -1);
        $('.btn-wrapper').css('z-index', -1);
        $('.modal-bg').animate({
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
        })
        $('.info').text(`You still have time, you sure?`);
        $('.modal-window').css({
            zIndex: 10
        }).fadeIn().animate({
            top: '-25px',
        }, 300)
    })

    $('#modal-close').click(function () {
        $('.modal-window').animate({
            top: '-80px',
            zIndex: 0
        }, 300).fadeOut()
        $('.modal-bg').animate({
            zIndex: -1,
            backgroundColor: 'rgba(0, 0, 0, 0)'
        })
        $('.block').css('z-index', 0);
        $('.left-block').css('z-index', 1);
        $('.btn-wrapper').css('z-index', 0);
    })

    $('.drop-block').mousedown(function() {
        $('.left-block').css('z-index', 0);
    })
    $('.drop-block').mouseup(function() {
        $('.left-block').css('z-index', 1);
    })

    let check = true;
    $('#modal-check').click(function () {
        for (let i = 0; i < $('.drop-block').length; i++) {
            if ($('.drop-block').eq(i).attr('data-number') != i + 1) {
                check = false;
                break;
            }
        }
        if (check) {
            $('.info').text(`Woohoo, well done, you did it!`);
            $('.info ~ span').css('display', 'none');
            $('#modal-check').css('display', 'none');
            clearInterval(time);
        } else {
            $('.info').text(`It's a pity, but you lost`);
            $('.info ~ span').css('display', 'none');
            $('#modal-check').css('display', 'none');
            clearInterval(time);
        }
        $('.check').addClass('disabled-btn').attr('disabled', true);
        check = true;
    })
})