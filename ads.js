var videoElement;

// On window load, attach an event to the play button click
// that triggers playback on the video element
window.addEventListener('load', function(event) {
  videoElement = document.getElementById('video-element');
  var playButton = document.getElementById('play-button');
  playButton.addEventListener('click', function(event) {
    videoElement.play();
  });
});
var videoElement;
// Define a variable to track whether there are ads loaded and initially set it to false
var adsLoaded = false;

  initializeIMA();
  videoElement.addEventListener('play', function(event) {
    loadAds(event);
  });

window.addEventListener('resize', function(event) {
  console.log("window resized");
});

function initializeIMA() {
  console.log("initializing IMA");
}

function loadAds(event) {
  // Prevent this function from running on if there are already ads loaded
  if(adsLoaded) {
    return;
  }
  adsLoaded = true;

  // Prevent triggering immediate playback when ads are loading
  event.preventDefault();

  console.log("loading ads");
}

// Initialize the container. Must be done via a user action on mobile devices.
videoElement.load();
adDisplayContainer.initialize();

var width = videoElement.clientWidth;
var height = videoElement.clientHeight;
try {
  adsManager.init(width, height, google.ima.ViewMode.NORMAL);
  adsManager.start();
} catch (adError) {
  // Play the video without ads, if an error occurs
  console.log("AdsManager could not be started");
  videoElement.play();
}



var adContainer;
adContainer = document.getElementById('ad-container');

var adDisplayContainer;
var adsLoader;

adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoElement);
  adsLoader = new google.ima.AdsLoader(adDisplayContainer);

  // Let the AdsLoader know when the video has ended
  videoElement.addEventListener('ended', function() {
    adsLoader.contentComplete();
  });

  var adsRequest = new google.ima.AdsRequest();
  adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
      'iu=/21775744923/external/single_ad_samples&sz=640x480&' +
      'cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&' +
      'gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=';
  
  // Specify the linear and nonlinear slot sizes. This helps the SDK to
  // select the correct creative if multiple are returned.
  adsRequest.linearAdSlotWidth = videoElement.clientWidth;
  adsRequest.linearAdSlotHeight = videoElement.clientHeight;
  adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
  adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight / 3;

  // Pass the request to the adsLoader to request ads
  adsLoader.requestAds(adsRequest);

  var adsManager;
// Global countdown timer
var countdownTimer;
  adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false);
adsLoader.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.STARTED,
        onAdsStarted);

        function onAdsStarted(adEvent) {
            countdownTimer = setInterval(function() {
              var timeRemaining = adsManager.getRemainingTime();
              // Update UI with timeRemaining
            }, 1000);
          }
          if (countdownTimer) {
            clearInterval(countdownTimer);
          }

          function onAdsManagerLoaded(adsManagerLoadedEvent) {
            var adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.enablePreloading = true;
          
            var adsManager = adsManagerLoadedEvent.getAdsManager(
                videoContent, adsRenderingSettings);
          }



          
    function onAdsManagerLoaded(adsManagerLoadedEvent) {
        // Instantiate the AdsManager from the adsLoader response and pass it the video element
        adsManager = adsManagerLoadedEvent.getAdsManager(
            videoElement);
      }
      
      function onAdError(adErrorEvent) {
        // Handle the error logging.
        console.log(adErrorEvent.getError());
        if(adsManager) {
          adsManager.destroy();
        }
      }

      if(adsManager) {
        var width = videoElement.clientWidth;
        var height = videoElement.clientHeight;
        adsManager.resize(width, height, google.ima.ViewMode.NORMAL);
      }

      adsManager.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError);
      adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
            onContentPauseRequested);
      adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
            onContentResumeRequested);
            adsManager.addEventListener(
                google.ima.AdEvent.Type.LOADED,
                onAdLoaded);

            function onContentPauseRequested() {
                videoElement.pause();
              }
              
              function onContentResumeRequested() {
                videoElement.play();
              }
              adContainer.addEventListener('click', adContainerClick);

              function adContainerClick(event) {
                console.log("ad container clicked");
                if(videoElement.paused) {
                  videoElement.play();
                } else {
                  videoElement.pause();
                }
              }
              function onAdLoaded(adEvent) {
                var ad = adEvent.getAd();
                if (!ad.isLinear()) {
                  videoElement.play();
                }
              }