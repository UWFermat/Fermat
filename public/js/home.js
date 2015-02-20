(function() {

    var width, height, largeHeader, canvas, ctx, circles, target, run_animation=true, request = 0;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < Math.round(width*0.2); x++) {
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
            _this.alpha = 0.1+Math.random()*0.3;
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

    //When user clicks on nav toggle
    $(".nav-toggle").click(function() {
        //Stop the animation if modal is being opened
        if(run_animation) {
            run_animation=false;
        } else {
            //Run the animation if modal is being closed
            run_animation=true;
        }
        animate(run_animation);
        $(this).toggleClass("active");
        $(".overlay-boxify").toggleClass("open");
    });

    //When user clicks outside
    $(".overlay").click(function() {
        $(".nav-toggle").toggleClass("active");
        $(".overlay-boxify").toggleClass("open");
        run_animation=true;
        animate(run_animation);
    });

})();