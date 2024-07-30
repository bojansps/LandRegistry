
class Property {
    constructor(id, issuer, owner, landStatus, landTransferStatus, landIssueDate) {
        this.id = id;
        this.issuer = issuer;
        this.owner = owner;
        this.landStatus = landStatus;
        this.landTransferStatus = landTransferStatus;
        this.landIssueDate = landIssueDate;
    }
}

module.exports = Property;
