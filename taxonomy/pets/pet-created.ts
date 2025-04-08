import { DonorId } from "../../service.donors/Donor"
import { PetId } from "../../service.pets/Pet"

export interface PetCreated {
  id: PetId
  userid: DonorId
  data: {
    pet: {
      id: PetId
      name: string
    }
    donor: {
      id: DonorId
    }
  }
}