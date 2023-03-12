import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  constructor() {}

  encrypt(request: any, key: any) {
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(request), key, {
      keySize: 16,
    });
    return encrypted.toString();
  }

  decrypt(request: any, key: any) {
    let bytes = CryptoJS.AES.decrypt(request, key);
    let orignalText = bytes.toString(CryptoJS.enc.Utf8);
    let object = JSON.parse(orignalText);
    return object;
  }
}
