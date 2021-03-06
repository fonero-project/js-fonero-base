import {default as xdr} from "../generated/fonero-xdr_generated";
import {Keypair} from "../keypair";
import {StrKey} from "../strkey";

/**
 * Returns a XDR PaymentOp. A "payment" operation send the specified amount to the
 * destination account, optionally through a path. FNO payments create the destination
 * account if it does not exist.
 * @function
 * @alias Operation.pathPayment
 * @param {object} opts
 * @param {Asset} opts.sendAsset - The asset to pay with.
 * @param {string} opts.sendMax - The maximum amount of sendAsset to send.
 * @param {string} opts.destination - The destination account to send to.
 * @param {Asset} opts.destAsset - The asset the destination will receive.
 * @param {string} opts.destAmount - The amount the destination receives.
 * @param {Asset[]} opts.path - An array of Asset objects to use as the path.
 * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
 * @returns {xdr.PathPaymentOp}
 */
export const pathPayment = function(opts) {
  switch (true) {
    case !opts.sendAsset:
      throw new Error("Must specify a send asset");
    case !this.isValidAmount(opts.sendMax):
      throw new TypeError(this.constructAmountRequirementsError('sendMax'));
    case !StrKey.isValidEd25519PublicKey(opts.destination):
      throw new Error("destination is invalid");
    case !opts.destAsset:
      throw new Error("Must provide a destAsset for a payment operation");
    case !this.isValidAmount(opts.destAmount):
      throw new TypeError(this.constructAmountRequirementsError('destAmount'));
  }

  let attributes = {};
  attributes.sendAsset    = opts.sendAsset.toXDRObject();
  attributes.sendMax      = this._toXDRAmount(opts.sendMax);
  attributes.destination  = Keypair.fromPublicKey(opts.destination).xdrAccountId();
  attributes.destAsset    = opts.destAsset.toXDRObject();
  attributes.destAmount   = this._toXDRAmount(opts.destAmount);

  let path        = opts.path ? opts.path : [];
  attributes.path = path.map(x => x.toXDRObject());

  let payment = new xdr.PathPaymentOp(attributes);

  let opAttributes = {};
  opAttributes.body = xdr.OperationBody.pathPayment(payment);
  this.setSourceAccount(opAttributes, opts);

  return new xdr.Operation(opAttributes);
};