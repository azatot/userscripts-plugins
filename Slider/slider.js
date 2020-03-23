var sliderFactory = {
    createNewSlider: () => {
        var newSlider = {
            //pairs key-value for this obj  
            imagesUrls: [],
            count: 0,
            butPrev: null, //document.getElementById('dos_prev_image'),
            butNext: null, //document.getElementById('dos_next_image'),
            currentImage: null, //document.getElementById('dos_current_image'),
            
        
            //let's begin by ".start()" method
            start: (elId) => {
                var that = this;
        
                var elSelector = "#" + elId;
                var el = document.querySelector(elSelector);
        
                this.butPrev = el.querySelector(".prev_image_but");
                this.butNext = el.querySelector(".next_image_but");
                this.currentImage = el.querySelector(".dos_slides");
        
                //binding on click 
                this.butPrev.addEventListener("click", function (e) {
                    that.actOnClickPrev(e);
                });
                this.butNext.addEventListener("click", function (e) {
                    that.actOnClickNext(e);
                });
        
                //put images in array for slider
                this.imagesUrls.push('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png');
                this.imagesUrls.push('https://proglib.io/wp-content/uploads/2018/07/1_qnI8K0Udjw4lciWDED4HGw.png');
                this.imagesUrls.push('https://i.ytimg.com/vi/XUSHH0E-7zk/maxresdefault.jpg');
                this.imagesUrls.push('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFu1OiJmxp8Ec36ZEXEgHEZ5qolp_gohwJ4Xx0f8v678UtfxTIxQ');
                this.imagesUrls.push('https://tproger.ru/wp-content/uploads/2017/05/react-app.jpg');
                this.imagesUrls.push('https://uploads.toptal.io/blog/image/125395/toptal-blog-image-1518187252525-03f6db7b1c131066061024c236c7e3ff.png')
                
                //starting status for image
                this.currentImage.src = this.imagesUrls[0];
                
                //starting status for prev button 
                this.butPrev.style.visibility = "hidden";
            },
        
            //do methods on click "<" and ">" buttons
            actOnClickNext: function () {
                this.count++;
                this.currentImage.src = this.imagesUrls[this.count];
                this.butPrev.style.visibility = "visible";
                if(this.count === this.imagesUrls.length-1) {
                    this.butNext.style.visibility = "hidden";
                }
                console.log("Next Slide");
            },
        
            actOnClickPrev: function(){
                this.count--;
                this.currentImage.src = this.imagesUrls[this.count];
                this.butNext.style.visibility = "visible";
                if(this.count == 0) {
                    this.butPrev.style.visibility = 'hidden';
                }
                    console.log("Previous Slide")
            }
        }
        return newSlider;
        }
};

