// Pseudocode for the fields of the university model

/*
    universityModel = {
        name: String, 
        location: String, <later consider 2int arr>
        gpa: float,
        ranking: Number,
        tuition: Number,
        sat_avg: Number,
        acceptanceRate: Number
        scholarship: Boolean,
         ye i think that's it.
    }ye coz we might need it later 
*/


import mongoose from 'mongoose';

const UniversitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String, 
        required: true,        
    },
    gpa: {
        type: Number,
        required: true, 
    },
    ranking: {
        type: Number,
        required: true,
    },
    tuition: {
        type: Number,
        required: true,
    },
    sat_avg: {
        type: Number,
        required: true,
    },
    acceptanceRate: {
        type: Number,
        required: true, 
    },
    scholarship: {
        type: Boolean,
        required: true,
    }
});

const University = new mongoose.model('University', UniversitySchema);

export default University;