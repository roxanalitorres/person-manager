import mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  ci: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  hasRuc: { type: Boolean, required: true },
  rucNumber: { type: String },
  hasFarm: { type: Boolean, required: true },
  farmHa: { type: Number },
  farmName: { type: String },
  crops: [String],
  family: [{
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    ci: { type: String, required: true }
  }],
  hasWorkers: { type: Boolean, required: true },
  totalWorkers: { type: Number },
  menWorkers: { type: Number },
  womanWorkers: { type: Number },
  over18Workers: { type: Number },
  under18Workers: { type: Number },
  minorWorkersOcuppacion: { type: String },
  hasPregnandWorkers: { type: Boolean },
  pregnandWorkers: { type: Number },
  pregnandWorkersOcuppacion: { type: String }
});

export default mongoose.models.Person || mongoose.model('Person', PersonSchema);