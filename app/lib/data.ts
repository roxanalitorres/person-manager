export interface Person {
  id: string;
  name: string;
  lastName: string;
  ci: string;
  dateOfBirth: string;
  hasRuc: boolean;
  rucNumber?: string;
  gender: 'male' | 'female' | 'other';
  hasFarm: boolean;
  farmHa?: number;
  farmName?: string;
  crops?: string[];
  family: { name: string; lastName: string; ci: string }[];
  hasWorkers: boolean;
  totalWorkers?: number;
  menWorkers?: number;
  womanWorkers?: number;
  over18Workers?: number;
  under18Workers?: number;
  minorWorkersOcuppacion?: string;
  hasPregnandWorkers: boolean;
  pregnandWorkers?: number;
  pregnandWorkersOcuppacion?: string;
}

export let persons: Person[] = [];

export function findPersonById(id: string): Person | undefined {
  return persons.find(p => p.id === id);
}

export function updatePerson(id: string, updatedPerson: Partial<Person>): Person | null {
  const index = persons.findIndex(p => p.id === id);
  if (index !== -1) {
    persons[index] = { ...persons[index], ...updatedPerson };
    return persons[index];
  }
  return null;
}

export function deletePerson(id: string): boolean {
  const initialLength = persons.length;
  persons = persons.filter(p => p.id !== id);
  return persons.length < initialLength;
}

export function addPerson(person: Omit<Person, 'id'>): Person {
  const newPerson = { id: Date.now().toString(), ...person };
  persons.push(newPerson);
  return newPerson;
}