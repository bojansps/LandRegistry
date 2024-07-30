const { Contract } = require("fabric-contract-api");
const crypto = require("crypto");
const Land = require("./property");
const LandStatus = require("./propertyStatus");
const TransferLandStatus = require("./transferPropertyStatus");

class PropertyContract extends Contract {
  constructor() {
    super("PropertyContract");
  }

  async instantiate() {
  }

  async put(ctx, key, value) {
    await ctx.stub.putState(key, Buffer.from(value));
    return { success: "OK" };
  }

  async get(ctx, key) {
    const buffer = await ctTx.stub.getState(key);
    if (!buffer || !buffer.length) return { error: "NOT_FOUND" };
    return { success: buffer.toString() };
  }

  async GetAllProperties(ctx) {
    const allResults = [];
    const iterator = await ctx.stub.getStateByRange('', '');
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push(record);
      result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }

  async RetrievePropertyDetails(ctx, propertyId) {
    let property = await ctx.stub.getState(propertyId);
    if (!property || !property.length) {
      throw new Error('Warranty ' + propertyId + ' not found');
    }
    return JSON.parse(property.toString());
  }


  /**
   * Creates a warranty
   *
   * @param ctx the transaction context
   * @param landId the id of the warranty
   * @param landIssuer issuer of the warranty (Retailer)
   * @param landOwner
   * @returns details for the created warranty
   */
  async IssueProperty(ctx, landId, landIssuer, landOwner) {

    // const owner = ctx.clientIdentity.getID();
    let land = new Land();
    let initialStatus = LandStatus.CREATED;
    let initialTransferStatus = null;
    let landIssueDate = await ctx.stub.getTxTimestamp();

    land.id = landId;
    land.issuer = landIssuer;
    land.owner = landOwner;
    land.landStatus = initialStatus;
    land.landTransferStatus = initialTransferStatus;
    land.issueDate = landIssueDate;

    // land.landTransferStatus = warrantyService;
    // land.warrantyIssueDate = warrantyIssueDate;
    // land.warrantyExpirationDate = warrantyExpirationDate;

    await ctx.stub.putState(landId.toString(), Buffer.from(JSON.stringify(land)));
    return JSON.stringify(land);
  }
}

exports.contracts = [PropertyContract];
