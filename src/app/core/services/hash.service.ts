import { Injectable } from '@angular/core';
import Forge from 'node-forge';


@Injectable({
  providedIn: 'root'
})
export class HashService {

  encWithPubKey(valueToEncrypt: string, pubKey: string): string {
    let realPubKey = '-----BEGIN PUBLIC KEY-----\n' + pubKey + '\n-----END PUBLIC KEY-----'
    const rsa = Forge.pki.publicKeyFromPem(realPubKey);
    return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  }
}
