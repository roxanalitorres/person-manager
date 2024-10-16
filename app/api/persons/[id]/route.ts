import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Person from '@/models/person';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const person = await Person.findById(params.id);
    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }
    return NextResponse.json(person);
  } catch (error) {
    return NextResponse.json({ error:`Failed to fetch person: ${error}` }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await request.json();
    const person = await Person.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }
    return NextResponse.json(person);
  } catch (error) {
    return NextResponse.json({ error: `Failed to update person:  ${error}` }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const person = await Person.findByIdAndDelete(params.id);
    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Person deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete person:  ${error}` }, { status: 500 });
  }
}