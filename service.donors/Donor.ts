export class DonorId {
  public readonly value = 'new-id'
}

export class Donor {
  public readonly id: DonorId

  constructor() {
    this.id = new DonorId()
  }
}