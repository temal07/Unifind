import mongoose from "mongoose";

const universitySchema2 = new mongoose.Schema({
    csv_university: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    averageGPA: {
        type: Number,
        required: true,
    },
    tuition: {
        type: Number,
        required: true,
    },
    satAverage: {
        type: Number,
        required: true,
        min: 400,
        max: 1600,
    },
    acceptanceRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    rankingGlobal: {
        type: Number,
        required: true,
    },
    rankingCountry: {
        type: Number,
        required: true,
    },
    scholarship: {
        type: Boolean,
        required: true,
    }
});

const University2 = mongoose.model('UniversityV3Dataset', universitySchema2);

export default University2;