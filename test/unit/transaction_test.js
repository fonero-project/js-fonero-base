import crypto from 'crypto';

describe('Transaction', function() {

  it("constructs Transaction object from a TransactionEnvelope", function(done) {
    let source      = new FoneroBase.Account("GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB", "0");
    let destination = "GDJJRRMBK4IWLEPJGIE6SXD2LP7REGZODU7WDC3I2D6MR37F4XSHBKX2";
    let asset       = FoneroBase.Asset.native();
    let amount      = "2000";

    let input = new FoneroBase.TransactionBuilder(source)
                .addOperation(FoneroBase.Operation.payment({destination, asset, amount}))
                .addMemo(FoneroBase.Memo.text('Happy birthday!'))
                .build()
                .toEnvelope()
                .toXDR('base64');


    var transaction = new FoneroBase.Transaction(input);
    var operation = transaction.operations[0];

    expect(transaction.source).to.be.equal(source.accountId());
    expect(transaction.fee).to.be.equal(100);
    expect(transaction.memo.type).to.be.equal(FoneroBase.MemoText);
    expect(transaction.memo.value.toString('ascii')).to.be.equal('Happy birthday!');
    expect(operation.type).to.be.equal('payment');
    expect(operation.destination).to.be.equal(destination);
    expect(operation.amount).to.be.equal(amount);

    done();
  });

  beforeEach(function() {
    FoneroBase.Network.useTestNetwork();
  })

  afterEach(function() {
    FoneroBase.Network.use(null);
  })

  it("does not sign when no Network selected", function() {
    FoneroBase.Network.use(null);
    let source      = new FoneroBase.Account("GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB", "0");
    let destination = "GDJJRRMBK4IWLEPJGIE6SXD2LP7REGZODU7WDC3I2D6MR37F4XSHBKX2";
    let asset       = FoneroBase.Asset.native();
    let amount      = "2000";
    let signer      = FoneroBase.Keypair.random();

    let tx = new FoneroBase.TransactionBuilder(source)
                .addOperation(FoneroBase.Operation.payment({destination, asset, amount}))
                .build();
    expect(() => tx.sign(signer)).to.throw(/No network selected/);
  });

  it("signs correctly", function() {
    let source      = new FoneroBase.Account("GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB", "0");
    let destination = "GDJJRRMBK4IWLEPJGIE6SXD2LP7REGZODU7WDC3I2D6MR37F4XSHBKX2";
    let asset       = FoneroBase.Asset.native();
    let amount      = "2000";
    let signer      = FoneroBase.Keypair.master();

    let tx = new FoneroBase.TransactionBuilder(source)
                .addOperation(FoneroBase.Operation.payment({destination, asset, amount}))
                .build();
    tx.sign(signer);

    let env = tx.toEnvelope();

    let rawSig = env.signatures()[0].signature();
    let verified = signer.verify(tx.hash(), rawSig);
    expect(verified).to.equal(true);
  });

  it("signs using hash preimage", function() {
    let source      = new FoneroBase.Account("GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB", "0");
    let destination = "GDJJRRMBK4IWLEPJGIE6SXD2LP7REGZODU7WDC3I2D6MR37F4XSHBKX2";
    let asset       = FoneroBase.Asset.native();
    let amount      = "2000";

    let preimage = crypto.randomBytes(64);
    let hash = crypto.createHash('sha256').update(preimage).digest();

    let tx = new FoneroBase.TransactionBuilder(source)
                .addOperation(FoneroBase.Operation.payment({destination, asset, amount}))
                .build();
    tx.signHashX(preimage);

    let env = tx.toEnvelope();
    expectBuffersToBeEqual(env.signatures()[0].signature(), preimage);
    expectBuffersToBeEqual(env.signatures()[0].hint(), hash.slice(hash.length - 4));
  });

  it("returns error when signing using hash preimage that is too long", function() {
    let source      = new FoneroBase.Account("GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB", "0");
    let destination = "GDJJRRMBK4IWLEPJGIE6SXD2LP7REGZODU7WDC3I2D6MR37F4XSHBKX2";
    let asset       = FoneroBase.Asset.native();
    let amount      = "2000";

    let preimage = crypto.randomBytes(2*64);
    let hash = crypto.createHash('sha256').update(preimage).digest();

    let tx = new FoneroBase.TransactionBuilder(source)
                .addOperation(FoneroBase.Operation.payment({destination, asset, amount}))
                .build();

    expect(() => tx.signHashX(preimage)).to.throw(/preimage cannnot be longer than 64 bytes/);
  });

  it("accepts 0 as a valid transaction fee", function(done) {
    let source      = new FoneroBase.Account("GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB", "0");
    let destination = "GDJJRRMBK4IWLEPJGIE6SXD2LP7REGZODU7WDC3I2D6MR37F4XSHBKX2";
    let asset       = FoneroBase.Asset.native();
    let amount      = "2000";
    let fee         = 0;

    let input = new FoneroBase.TransactionBuilder(source, {fee: 0})
                .addOperation(FoneroBase.Operation.payment({destination, asset, amount}))
                .addMemo(FoneroBase.Memo.text('Happy birthday!'))
                .build()
                .toEnvelope()
                .toXDR('base64');


    var transaction = new FoneroBase.Transaction(input);
    var operation = transaction.operations[0];

    expect(transaction.fee).to.be.equal(0);

    done();
  });

});

function expectBuffersToBeEqual(left, right) {
  let leftHex = left.toString('hex');
  let rightHex = right.toString('hex');
  expect(leftHex).to.eql(rightHex);
}
