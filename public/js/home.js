$(document).ready(function() {

    var width, height, largeHeader, canvas, ctx, circles, target, run_animation=true, request = 0;

    //====== Start of Particle Animation ====== 
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('home_page');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < Math.round(width*0.15); x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate(run_animation);
    }

    // Event handling
    function addListeners() {
        window.addEventListener('resize', resize);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate(run_animation) {
        if (run_animation) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
            request = window.requestAnimationFrame(animate);
        } else {
            window.cancelAnimationFrame(request);
            request = 0;
        }
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = height+Math.random()*100;
            _this.alpha = 0.1+Math.random()*0.5;
            _this.scale = 0.1+Math.random()*0.3;
            _this.velocity = Math.random();
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0008;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.fill();
        };
    }

    //========= End of Particle Animation ===========

    //========= Start of Sign Up Modal ==============

    $('#start_collab_btn').on('click', function() {
        stopAnimation();
    });

    $('#sign_in_modal').on('show.bs.modal', function () {
        // Focus the first field of the modal 
        // Use a timeout function, otherwise focus doesn't seem to work (perhaps because modal isn't fully shown yet)
        if($('.tab.active a').attr('href') == '#login') {
            setTimeout(function() { 
                $('#login_email').focus(); 
            }, 500);
        } else {
            setTimeout(function() { 
                $('#register_first_name').focus(); 
            }, 500);
        }
    });

    $('#sign_in_modal').on('hide.bs.modal', function () {
        startAnimation();
     })

    $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
        var $this = $(this),
        label = $this.prev('label');

        if (e.type === 'keyup') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.addClass('active highlight');
            }
        } else if (e.type === 'blur') {
            if( $this.val() === '' ) {
                label.removeClass('active highlight'); 
            } else {
                label.removeClass('highlight');   
            }   
        } else if (e.type === 'focus') {
          
            if($this.val() === '') {
                label.removeClass('highlight'); 
            } 
            else if( $this.val() !== '' ) {
                label.addClass('highlight');
            }
        }

    });

    $('.tab a').on('click', function (e) {
      
        e.preventDefault();
      
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
      
        target = $(this).attr('href');
        if($(this).attr('href') == '#signup') {
            // Focus the first field of the sign up form
            setTimeout(function() { 
                $('#register_first_name').focus(); 
            }, 500);
        } else {
            // Focus the first field of the login form
            setTimeout(function() { 
                $('#login_email').focus(); 
            }, 500);
        }

        $('.tab-content > div').not(target).hide();
      
        $(target).fadeIn(600);
      
    });

    //========= End of Sign Up Modal ================

    //When user clicks on nav toggle
    $(".nav-toggle").click(function() {
        toggleAnimation();
        toggleOverlay();
    });

    //When user clicks outside
    $(".overlay").click(function() {
        startAnimation();
        toggleOverlay();
    });

    function toggleAnimation() {
        //Stop the animation if overlay is being opened
        if(run_animation) {
            run_animation = false;
        } else {
            //Run the animation if overlay is being closed
            run_animation = true;
        }
        animate(run_animation);
    }

    function startAnimation() {
        run_animation = true;
        animate(run_animation);
    }

    function stopAnimation() {
        run_animation = false;
        animate(run_animation);
    }

    function toggleOverlay() {
        $(".nav-toggle").toggleClass("active");
        $(".overlay-boxify").toggleClass("open");
    }

    setTimeout(function() {
        $("#learn_more_btn").addClass("fadeInUp");
        $("#start_collab_btn").addClass("fadeInUp");
        $("#learn_more_btn").show();
        $("#start_collab_btn").show();
    }, 400);


});