import React from 'react';
import { Button } from "@/app/components/ui/button"
import {PersonSchema} from "@/schemas/personSchema";


type PersonListProps = {
  persons: PersonSchema[];
  onEdit: (person: PersonSchema) => void;
  onDelete: (id: string) => void;
};

export const PersonList: React.FC<PersonListProps> = ({ persons, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {persons.map((person) => (
        <div key={person.id} className="flex items-center justify-between p-4 border rounded">
          <div>
            <h3 className="font-semibold">{person.name} {person.lastName}</h3>
            <p className="text-sm text-gray-500">CI: {person.ci}</p>
          </div>
          <div className="space-x-2">
            <Button onClick={() => onEdit(person)} variant="outline">Editar</Button>
            <Button onClick={() => onDelete(person._id)} variant="destructive">Eliminar</Button>
          </div>
        </div>
      ))}
    </div>
  );
};