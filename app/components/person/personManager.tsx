'use client'

import React, { useState, useEffect } from 'react';
import { PersonForm } from '@/app/components/person/personForm';
import { PersonList } from '@/app/components/person/personList';
import { Button } from "@/app/components/ui/button"
import {PersonSchema} from "@/schemas/personSchema";
import { Skeleton} from "@/app/components/ui/skeleton";

import {useToast} from "@/hooks/use-toast";
import {Toaster} from "@/app/components/ui/toaster";


export default function PersonManager() {
  const [persons, setPersons] = useState([]);
  const [editingPerson, setEditingPerson] = useState<PersonSchema | null>(null);
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true);
  // forces React to unmount and remount the form
  const [key, setKey] = useState(0);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/persons');
      if (!response.ok) {
        throw new Error('Failed to fetch persons');
      }
      const data = await response.json();
      setPersons(data);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to fetch persons: ${error}.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: PersonSchema) => {
    try {
      let response;
      if (editingPerson) {

        const personId = editingPerson._id;

        if (!personId) {
          throw new Error('Invalid person ID');
        }
        response = await fetch(`/api/persons/${personId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }else {
        response = await fetch('/api/persons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }
      if (!response.ok) {
        throw new Error('Failed to save person');
      }
      await fetchPersons();
      setEditingPerson(null);
      setKey(prevKey => prevKey + 1);

      toast({
        title: "Success",
        description: editingPerson ? "Person updated successfully" : "Person created successfully",
      })
    } catch (error) {
      console.error('Error update person:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingPerson ? 'update' : 'create'} person. Please try again.`,
        variant: "destructive",
      })
    }
  };

  const handleEdit = (person : PersonSchema) => {
    setEditingPerson(person);
    setKey(prevKey => prevKey + 1);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/persons/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete person');
      }
      await fetchPersons();
      toast({
        title: "Success",
        description: "Person deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting person:', error);
      toast({
        title: "Error",
        description: "Failed to delete person. Please try again.",
        variant: "destructive",
      })
    }
  };
  const handleCancelEdit = () => {
    setEditingPerson(null);
    setKey(prevKey => prevKey + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {editingPerson ? 'Editar Persona' : 'Crear Nueva Persona'}
      </h1>
      <PersonForm  key={key} onSubmit={handleSubmit} initialData={editingPerson}/>
      {editingPerson && (
        <Button onClick={handleCancelEdit} className="mt-4">Cancelar Edición</Button>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Lista de Personas</h2>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <PersonList persons={persons} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
      <Toaster />
    </div>
  );
}