
import { NextRequest, NextResponse } from 'next/server';
import Person from '@/models/person';
import  { dbConnect } from '@/lib/mongodb';

export async function GET() {
  await dbConnect();
  try {
    const persons = await Person.find({});
    return NextResponse.json(persons);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const person = await Person.create(body);
    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}