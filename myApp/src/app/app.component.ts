//-------------------------------------------------------------------------------------
/// <reference path="WikitudePlugin.d.ts" />
//-------------------------------------------------------------------------------------

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

	  //-------------------------------------------------------------------------------------
      // 在 http://www.wikitude.com/developer/licenses 申請一個免費的skdKey, 並貼入以下:
      //-------------------------------------------------------------------------------------      
      WikitudePlugin._sdkKey = "qYfD52RgkiA+w0ASxDOGt3gVoa9uZx80ZVc5r4zMNAhod4gmV7A49oDySmYOf98LiNLZ3sHsFGugtWMM811U0rIcC5gD7NSew2xw6nlQ62nP2+amFjxRpTQ3/8T+pPHMVtXo90rzilCeOf+KzSYtCW9ibJRtEwio+zMeWHrb/ONTYWx0ZWRfX7j4lPisZy3Fpw/XM1Zs1L3ONfYTZ9g2uLc5X4WmWwIviUH8aZio/hLzIP/4f4nM0bc8+VIeYUSmsVaPmH7v37NXWcFdKNHrL3sbqgZTElZo/3LqaWws6LBD7KgdBTapAdYzLeNpGyvg+BPnjiZK0p/Qr88kbxgJbiZ3VA8alnh1kvKp61NYPzLDSXznkl0z7j+ZK8oV01UqrWDooCZ/1+eIoLlH3uDgCaFNBXpWWk4+uvuVyXrakhPH/vwqCjtKgLn3CMxM1PMF2Bb04CZEePShl+BPLq8JE2bqvzcHIdisqWV2WKIsJrDHeKr62Ve2mTIPBrbs7nhpvhZQtTyyVnZJR9PU8UIKq2O+4lKUPDNxnWWoSiYEE+GRhFzA/FCyMWrRwt+6z2Cm/jakd1vON0UKuieG8zG0Gq/7UrQxyr8WEm/szqkVscj8i01iZwSnREXT2c+yoz/qDkDKOD0G15tL6cX/rXuNg/yL0N756p7P+VJkH2GVfPVEfJ+/7Hkh/JT4hpS0QdiCVfVH/SnLCcYnuTFiJWzYDA=="
	  
      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );                  

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic2 app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }
	  //-------------------------------------------------------------------------------------     
      
    });
  }
}

