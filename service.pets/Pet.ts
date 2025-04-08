import { Exception } from "../error"

const InvalidPetName = new Exception('Nome do pet inválido.')

export class PetId {
  public readonly value = 'id'
}

export class Pet {
  public readonly id: PetId
  public readonly name: string

  constructor(name: string) {
    if (name.length > 50) {
      throw InvalidPetName
    }

    this.name = name
    this.id = new PetId()
  }
}