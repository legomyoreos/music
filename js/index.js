var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    var playButton = $('#songControl');
    playButton.click(function () {
        if (!playing) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    var songTimeUpdate = function() {
        $('audio').on('timeupdate', function() {
                seekbar.attr("value", this.currentTime / this.duration);
                currentTime.text(wholeSecond(this.currentTime));

                function wholeSecond(s) {
                   var toInterger = Math.floor(s);

                     return (toInterger-(toInterger%=60))/60+(9<toInterger?':':':0')+toInterger;
                }
            });
    };

    if (supportsAudio) {
        var index = 0,
            playing = false,
            artPath = 'img/',
            mediaPath = 'music/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Redbone",
                "artist": "Childish Gambino",
                "album": "'Awaken My Love!'",
                "length": "5:27",
                "file": "childish_redbone",
                "thumbnail": "childish-thumb.jpg",
                "background": "childish-background.jpg"
            }, {
                "track": 2,
                "name": "I am",
                "artist": "Jorja Smith",
                "album": "`Black Panther`",
                "length": "3:28",
                "file": "jorja-smith_I-Am",
                "thumbnail": "smith-thumb.jpg",
                "background": "smith-background.jpg"
            }, {
                "track": 3,
                "name": "DNA.",
                "artist": "Kendrick Lamar",
                "album": "DAMN.",
                "length": "4:46",
                "file": "kendrick_dna",
                "thumbnail": "kendrick-thumb.jpg",
                "background": "kendrick-background.jpg"
            }, {
                "track": 4,
                "name": "One Dance",
                "artist": "Drake",
                "album": "Views",
                "length": "2:54",
                "file": "drake_onedance",
                "thumbnail": "drake-thumb.jpg",
                "background": "drake-background.jpg"
            }, {
                "track": 5,
                "name": "Thinkin' Bout You",
                "artist": "Frank Ocean",
                "album": "Channel Orange",
                "length": "3:20",
                "file": "frankocean_thinkin-bout-you",
                "thumbnail": "frank-thumb.jpg",
                "background": "frank-background.jpg"
            }],
            trackCount = tracks.length,
            npTitle = $('#npTitle'),
            npArtist = $('#npArtist'),
            npLength = $('#npLength'),
            backgroundImage = $('#background-image'),
            thumbnailImage = $('#currentArt'),
            songControlImg = $('#songControl > img'),
            seekbar = $('#seekbar'),
            currentTime = $('#currentTime'),
            songLength= $('#songLength'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                songControlImg.attr('src', 'img/pause.png');
                songTimeUpdate();
            }).bind('pause', function () {
                playing = false;
                songControlImg.attr('src', 'img/play.png');
            }).bind('ended', function () {
                songControlImg.attr('src', 'img/pause.png');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    index = 0;
                    loadTrack(index);
                    audio.play();
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    index = 0;
                    loadTrack(index);
                    audio.play();
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                // songLength.text('0:00');
                if (id !== index) {
                    loadTrack(id);
                    audio.play();
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                npArtist.text(tracks[id].artist);
                npLength.text(tracks[id].length);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                thumbnailImage.attr('src', artPath + tracks[id].thumbnail);
                backgroundImage.attr('src', artPath + tracks[id].background);
                songLength.text(tracks[id].length);
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});