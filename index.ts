import { Donor, DonorId } from "./service.donors/Donor";
import { Pet } from "./service.pets/Pet";

import { PetCreated } from "./taxonomy/pets/pet-created";

abstract class Event<Schema> {
  public topic: string
  public data: Schema

  constructor(topic: string, data: Schema) {
    this.topic = topic
    this.data = data
  }
}

class PetCreatedEvent extends Event<PetCreated> {
  public topic: string;
  public data: PetCreated;

  constructor(data: { pet: Pet; donorId: DonorId }) {
    const topic = 'event-streaming.pets.created-pets'
    const event: PetCreated = {
      id: data.pet.id,
      userid: data.donorId,
      data: {
        pet: {
          id: data.pet.id,
          name: data.pet.name,
        },
        donor: {
          id: data.donorId
        }
      }
    }

    super(topic, event)
  }
}

async function publish<Schema>(props: Event<Schema>): Promise<void> {
  console.log(`topic: ${props.topic}`)
  console.log(`data: ${JSON.stringify(props.data)}`)
}

const donor = new Donor()

async function createPet({ name, donorId }: { donorId: DonorId; name: string }) {
  const pet = new Pet(name)

  const event = new PetCreatedEvent({
    donorId,
    pet,
  })

  // call repository
  await Promise.all([
    publish(event)
  ])

  return {
    pet
  }
}

const { pet } = await createPet({
  name: 'kyara',
  donorId: donor.id
})

console.log(`just created a new pet. id: ${pet.id.value}. name: ${pet.name}`)