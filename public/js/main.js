$(document).ready(function() {
    $.ajaxSetup({
        cache: true
    });
    $.getScript('//connect.facebook.net/en_US/sdk.js', function() {
      console.log('getting facebook')
        FB.init({
            appId: '{317764825333433}',
            version: 'v2.7' // or v2.1, v2.2, v2.3, ...
        });
        $('#loginbutton,#feedbutton').removeAttr('disabled');
        FB.getLoginStatus(updateStatusCallback);
    });

    function updateStatusCallback() {
        console.log("SUccess")
        // Your logic here
    }


    console.log('Jquery loaded')

    //CANVAS
    var canvas = document.getElementsByClassName('memecanvas')[0],
        context = canvas.getContext('2d'),
        baseImage = new Image(),
        filterImage = new Image(),
        mistakeImage = new Image(),
        pictureImage = new Image(),
        currentPicture = new Image(),
        currentMistake = new Image();

    baseImage.src = '../img/assets/ui-elements/canvas-base.jpg';
    filterImage.src = '../img/assets/ui-elements/filter-violet.png';
    currentMistake.src = '../img/assets/mistakes/step2-bleaching-thumbnail.jpg';
    currentPicture.src = '../img/assets/pictures/step1-image01-thumbnail.jpg'

    context.textAlign = 'center'
    context.font = '20pt Avenir';
    context.fillStyle = 'white';

    // var hRatio = canvas.width / baseImage.width,
    //     vRatio = canvas.height / baseImage.height,
    //     ratio  = Math.min ( hRatio, vRatio ),
    //     middleWidth = canvas.width / 2 - baseImage.width / 2

    // console.log('middleWidth',middleWidth)
    // middleHeight = canvas.height / 2 - baseImage.heuight / 2;

    console.log('base image width', baseImage.width, 'base image height', baseImage.height)
    console.log('canvas width', canvas.width, 'canvas height', canvas.height)
    console.log(baseImage)

    baseImage.onload = function() {
        console.log('loading image')

        startOver(this)
        // context.drawImage(baseImage,0,0)
    }

    //CANVAS STATE
    var restorePoint = [],
        hairSourceArray = $("img.hair-picture").map(function() {
            return $(this).attr('src');
        }).get(),
        thisPicture = "",
        $window = $(window);

    $('.hair-picture').click(function(e) {
        e.preventDefault();
        currentPicture.src = $(this).attr('src');
        draw(currentPicture)
    });

    $('.mistake').click(function(e) {
        e.preventDefault();
        currentMistake.src = $(this).attr('src');
        drawMistake(currentMistake)
    });

    // $("th").click(function(e) {
    //   console.log(this)
    //   console.log($('table th'))
    //     e.preventDefault();
    //     $('table th').removeClass("selected");
    //     $(this).addClass("selected");
    // })

    function draw(image) {
        startOver(baseImage);
        image.onload = function() {
            context.restore();
            context.drawImage(image, canvas.width / 6, canvas.height / 6, canvas.width * 2 / 3, canvas.height * 2 / 3);
            context.globalAlpha = 0.5;
            context.drawImage(filterImage, canvas.width / 6, canvas.height / 6, canvas.width * 2 / 3, canvas.height * 2 / 3);
            context.globalAlpha = 1;
            context.fillText('Sorry for...', canvas.width / 2, canvas.height * 3 / 12);
            context.fillText('Let\'s #RepairThatHair', canvas.width / 2, canvas.height * 17 / 24);
            context.fillText('Bumble and bumble.', canvas.width / 2, canvas.height * 19 / 24);
        }

    }

    function drawMistake(image) {
        startOver(baseImage);
        image.onload = function() {
            context.restore();
            context.drawImage(currentPicture, canvas.width / 6, canvas.height / 6, canvas.width * 2 / 3, canvas.height * 2 / 3);
            context.globalAlpha = 0.5;
            context.drawImage(filterImage, canvas.width / 6, canvas.height / 6, canvas.width * 2 / 3, canvas.height * 2 / 3);
            // context.drawImage(image, canvas.width / 6, canvas.height / 6, canvas.width * 2 / 3, canvas.height * 2 / 3);
            context.globalAlpha = 0.5;
            context.drawImage(image, canvas.width / 6, canvas.height / 6, canvas.width * 2 / 3, canvas.height * 2 / 3);

            context.fillText('Sorry for...', canvas.width / 2, canvas.height * 3 / 12);
            context.fillText('Let\'s #RepairThatHair', canvas.width / 2, canvas.height * 17 / 24);
            context.fillText('Bumble and bumble.', canvas.width / 2, canvas.height * 19 / 24);
            context.globalAlpha = 1;
        }


    }


    function startOver(base) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        var wrh = base.width / base.height,
            newWidth = canvas.width,
            newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth = newHeight * wrh;
        }
        context.drawImage(base, 0, 0, newWidth, newHeight);
        context.save();

    }

    function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            currentPicture.src = event.target.result;
            draw(currentPicture);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    console.log('hairSourceArray', hairSourceArray);

    // pictureImage.onload = function(){
    //     context.drawImage(pictureImage,canvas.width/6,canvas.height/6,canvas.width*2/3,canvas.height*2/3);
    // }

    // context.drawImage(pictureImage, 0, 0)
    // context.globalAlpha = 0.3;
    // context.drawImage(filterImage, 0, 0)
    // context.globalAlpha = 0.6;
    // context.drawImage(mistakeImage, 0, 0)
    // context.globalAlpha = 1;





    //NAVIGATION
    var StepOne = $('#StepOne')
    StepTwo = $('#StepTwo'),
        StepThree = $('#StepThree'),
        StepOneContinue = StepOne.find('.Continue'),
        StepTwoContinue = StepTwo.find('.Continue'),
        StepTwoBack = StepOne.find('.Back'),
        StepThreeBack = StepThree.find('.Back');
    $("#StepOne").hide().show();
    $("#StepTwo").hide();
    $("#StepThree").hide();

    $('.mycheckbox').change(function() {
        if (this.checked)
            $('.Navigation').fadeIn('slow');
        else
            $('.Navigation').fadeOut('slow');
    })

    $('.Continue').click(function(event) {
        var target = $(event.target);
        if (target.parents('#StepOne').length) {
            $('#right-side').fadeOut('slow').promise().done(function(logo) {
                $("#StepOne").hide();
                $("#StepTwo").show();
                context.save();
                $(this).fadeIn('slow');
            });

            // $( "#StepOne" ).replaceWith( $( "#StepTwo" ) );
        } else if (target.parents('#StepTwo').length) {
            $('#right-side').fadeOut('slow').promise().done(function(logo) {
                $("#StepTwo").hide();
                $("#StepThree").show();
                $("#preview").show();
                context.save();
                $(this).fadeIn('slow');
            });
            // $("#StepTwo").hide();
            // $("#StepThree").show();
            // context.save();
            // $( "#StepTwo" ).replaceWith( $( "#StepThree" ) );
        }
    })

    $('.Back').click(function(event) {
        var target = $(event.target);
        if (target.parents('#StepTwo').length) {
            $('#right-side').fadeOut().promise().done(function(rightDiv) {
                console.log('going back to One')
                $("#StepTwo").hide();
                $("#StepOne").show();
                context.save();
                $(rightDiv).fadeIn('slow');
            });

            // $( "#StepOne" ).replaceWith( $( "#StepTwo" ) );
        } else if (target.parents('#StepThree').length) {
            $('#right-side').fadeOut().promise().done(function(rightDiv) {
                console.log('going back to Two')
                $("#StepThree").hide();
                $("#StepTwo").show();
                if ($window.width() < 780) {
                    $("#preview").hide();
                }
                context.save();
                $(rightDiv).fadeIn('slow');
            });

            // $("#StepThree").hide();
            // $("#StepTwo").show();
            // context.restore();
            // $( "#StepTwo" ).replaceWith( $( "#StepThree" ) );
        }
    })
    //DoOver
    var doOver = document.getElementById('DoOver');
    doOver.addEventListener('click', function(event) {

        $('#right-side').fadeOut().promise().done(function(rightDiv) {
            $('#StepThree').hide();
            $('#StepOne').show()
            startOver(baseImage);
            $(rightDiv).fadeIn('slow');
            if ($window.width() < 780) {
                $("#preview").hide();
            }
        })
    })

    //DOWNLOAD
    var download = document.getElementById('download');
    download.addEventListener('click', function(event) {
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = image;
    }, false);

    //UPLOAD
    var upload = document.getElementById('file-input');
    upload.addEventListener('change', handleImage, false);

    $('.right').click(function(e) {
        e.preventDefault();
        $('.tg').css({
            'right': '0px',
            'left': ''
        }).animate({
            'right': '30px'
        });
    });
    $('.left').click(function(e) {
        e.preventDefault();
        $('.tg').css({
            'right': '',
            'left': '0px'
        }).animate({
            'left': '30px'
        });
    });

    //FACEBOOK
    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {
            type: 'image/png'
        });
    }

    $('#shareFB').click(function(e) {



        var data = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        console.log('canvas image',data)

        try {
            blob = dataURItoBlob(data);

        } catch (e) {
            console.log(e);
        }
        FB.getLoginStatus(function(response) {
            console.log(response);
            if (response.status === "connected") {
                postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
            } else if (response.status === "not_authorized") {
                FB.login(function(response) {
                    postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
                }, {
                    scope: "publish_actions"
                });
            } else {
                FB.login(function(response) {
                    postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
                }, {
                    scope: "publish_actions"
                });
            }
        });
    });

    function postImageToFacebook(token, filename, mimeType, imageData, message) {
        var fd = new FormData();
        fd.append("access_token", token);
        fd.append("source", imageData);
        fd.append("no_story", true);

        // Upload image to facebook without story(post to feed)
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + token,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function(data) {
                console.log("success: ", data);

                // Get image source url
                FB.api(
                    "/" + data.id + "?fields=images",
                    function(response) {
                        if (response && !response.error) {
                            //console.log(response.images[0].source);

                            // Create facebook post using image
                            FB.api(
                                "/me/feed",
                                "POST", {
                                    "message": "",
                                    "picture": response.images[0].source,
                                    "link": window.location.href,
                                    "name": 'Look at the cute panda!',
                                    "description": message,
                                    "privacy": {
                                        value: 'SELF'
                                    }
                                },
                                function(response) {
                                    if (response && !response.error) {
                                        /* handle the result */
                                        console.log("Posted story to facebook");
                                        console.log(response);
                                    }
                                }
                            );
                        }
                    }
                );
            },
            error: function(shr, status, data) {
                console.log("error " + data + " Status " + shr.status);
            },
            complete: function(data) {
                //console.log('Post to facebook Complete');
            }
        });
    }


})
