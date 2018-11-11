import * as FoneroBase from "../src"

var keypair = FoneroBase.Keypair.random();
var data = 'data to sign';
var signature = FoneroBase.sign(data, keypair.rawSecretKey());

console.log('Signature: '+signature.toString('hex'));

if (FoneroBase.verify(data, signature, keypair.rawPublicKey())) {
  console.log('OK!');
} else {
  console.log('Bad signature!');
}
