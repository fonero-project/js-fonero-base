describe("Network.current()", function() {
  it("defaults network is null", function() {
    expect(FoneroBase.Network.current()).to.be.null;
  });
});

describe("Network.useTestNetwork()", function() {
  it("switches to the test network", function() {
    FoneroBase.Network.useTestNetwork();
    expect(FoneroBase.Network.current().networkPassphrase()).to.equal(FoneroBase.Networks.TESTNET)
  });
});

describe("Network.usePublicNetwork()", function() {
  it("switches to the public network", function() {
    FoneroBase.Network.usePublicNetwork();
    expect(FoneroBase.Network.current().networkPassphrase()).to.equal(FoneroBase.Networks.PUBLIC)
  });
});
