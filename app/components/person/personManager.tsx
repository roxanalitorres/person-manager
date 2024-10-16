'use client'

import React, { useState, useEffect } from 'react';
import { PersonForm } from '@/app/components/person/personForm';
import { PersonList } from '@/app/components/person/personList';
import { Button } from "@/app/components/ui/button"

export default function PersonManager() {
  const [persons, setPersons] = useState([]);
  const [editingPerson, setEditingPerson] = useState(null);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    const response = await fetch('/api/persons');
    const data = await response.json();
    setPersons(data);
  };

  const handleSubmit = async (data: any) => {
    console.log('hizo submit')
    if (editingPerson) {
      await fetch(`/api/persons/${editingPerson.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      await fetch('/api/persons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }
    fetchPersons();
    setEditingPerson(null);
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/persons/${id}`, { method: 'DELETE' });
    fetchPersons();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Personas</h1>
      <PersonForm onSubmit={handleSubmit} />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Lista de Personas</h2>
        <PersonList persons={persons} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      {editingPerson && (
        <Button onClick={() => setEditingPerson(null)} className="mt-4">Cancelar Edición</Button>
      )}
    </div>
  );
}