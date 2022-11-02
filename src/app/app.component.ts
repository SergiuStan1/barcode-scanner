import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat, Result } from '@zxing/library';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

    ngVersion = VERSION.full;

    @ViewChild('scanner')
    scanner!: ZXingScannerComponent;

    hasCameras = false;
    hasPermission!: boolean;
    qrResultString!: string;

    availableDevices!: MediaDeviceInfo[];
    selectedDevice!: any;

    allowedFormats = [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_128,
      BarcodeFormat.DATA_MATRIX /*, ...*/,
    ];

    ngOnInit(): void {

        this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
            this.hasCameras = true;

            console.log('Devices: ', devices);
            this.availableDevices = devices;

            // selects the devices's back camera by default
            // for (const device of devices) {
            //     if (/back|rear|environment/gi.test(device.label)) {
            //         this.scanner.changeDevice(device);
            //         this.selectedDevice = device;
            //         break;
            //     }
            // }
        });

        this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
            console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
        });

        this.scanner.permissionResponse.subscribe((answer: boolean) => {
          this.hasPermission = answer;
        });
    
    }

    handleQrCodeResult(resultString: string) {
        console.log('Result: ', resultString);
        this.qrResultString = resultString;
        alert(`iccid: ${resultString}`);
    }
    onDeviceSelectChange(selected: string) {
        console.log('Selection changed: ', selected);
      const device = this.availableDevices.find(x => x.deviceId === selected);
      this.selectedDevice = device || null;
    }
    // onDeviceSelectChange(selectedValue: string) {
    //     console.log('Selection changed: ', selectedValue);
    //     this.selectedDevice = this.scanner.getDeviceById(selectedValue);
    // }
}
