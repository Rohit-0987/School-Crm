import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  year: {
    type: Number,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  assignedTeacher: {  
    type: String,  
    required: true
  },
  currentCapacity: {
    type: Number,
    default: 0
  },
  maxCapacity: {
    type: Number,
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  numMaleStudents: {
    type: Number,
    default: 0
  },
  numFemaleStudents: {
    type: Number,
    default: 0
  }
}, { timestamps: true });


classSchema.pre('save', async function(next) {
  try {
    const numMaleStudents = await this.model('Student').countDocuments({ class: this._id, gender: 'Male' });
    const numFemaleStudents = await this.model('Student').countDocuments({ class: this._id, gender: 'Female' });
    this.numMaleStudents = numMaleStudents;
    this.numFemaleStudents = numFemaleStudents;
    next();
  } catch (error) {
    next(error);
  }
});

const Class = mongoose.model('Class', classSchema);

export default Class;
