import {Component}     from '@angular/core';
import {CameraPreview} from "@ionic-native/camera-preview/ngx";
import {Platform}      from "@ionic/angular";

@Component({
               selector   : 'app-tab2',
               templateUrl: 'tab2.page.html',
               styleUrls  : ['tab2.page.scss']
           })
export class Tab2Page {

    constructor(private cameraPreview: CameraPreview,
                private platform: Platform) {
    }

    async ionViewWillEnter() {
        console.log("WILL ENTER: ");

        await this.startCameraAbove();
    }

    async ionViewWillLeave() {
        console.log("WILL LEAVE");

        await this.stopCamera();
    }

    async startCameraAbove() {
        try {

            await this.platform.ready();
            await this.cameraPreview.startCamera({
                                                     x          : 0,
                                                     y          : 0,
                                                     width      : this.platform.width(),
                                                     height     : this.platform.height(),
                                                     toBack     : true,
                                                     camera     : "rear",
                                                     previewDrag: false,
                                                     tapPhoto   : true
                                                 });
        } catch (err) {
            console.error("startCameraAbove", err);
        } finally {
        }
    }

    async stopCamera() {
        try {
            console.log("stopping camera");
            await this.cameraPreview.stopCamera();
        } catch (err) {
            console.error("stop camera error. Err: ", err);
        } finally {
        }
    }

    takePicture() {
        this.cameraPreview.takePicture({
                                           width  : 1280,
                                           height : 1280,
                                           quality: 85

                                       }).then(async (imageData: string) => {
            console.log("TAKE PHOTO: ");
        });
    }

    show() {
        return this.cameraPreview.show();
    }

    async hide() {
        return this.cameraPreview.hide();
    }
}
