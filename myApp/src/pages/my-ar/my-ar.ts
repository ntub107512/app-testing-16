//----------------------------------------------------------------
/// <reference path="../../app/WikitudePlugin.d.ts" />
//----------------------------------------------------------------

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyAr page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-ar',
  templateUrl: 'my-ar.html',
})
export class MyAr {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAr');
  }


  //----------------------------------------------------------------------
  ionViewDidEnter() {
      var startupConfiguration: any = {"camera_position": "back"};

      WikitudePlugin.loadARchitectWorld(
          function(success) {
            console.log("ARchitect World loaded successfully.");

            //---------------------------------------------------------------------------------------------
            //傳參數給 [www/assets/09_ObtainPoiData_1_FromApplicationModel/fromapplicationmodel.js]的函式
            //---------------------------------------------------------------------------------------------
            WikitudePlugin.callJavaScript('World.loadPoisFromJsonData([{"id": "1","longitude": "121.525599","latitude": "25.042021","description": "國立台北商業大學","altitude": "100.0", "name": "學校"}])');
            //---------------------------------------------------------------------------------------------

          },
          function(fail) {
            console.log("Failed to load ARchitect World!");            
          },
          //------------------------------------------------------------------------
          // 引用AR樣版 (官網有多個不同應用型態樣版可下載, 自行選擇應用)
          //------------------------------------------------------------------------          
          "www/assets/09_ObtainPoiData_1_FromApplicationModel/index.html",  
          //------------------------------------------------------------------------ 
          ["geo"],  
          <JSON>startupConfiguration
      );
  } 
  //----------------------------------------------------------------------
   
}
