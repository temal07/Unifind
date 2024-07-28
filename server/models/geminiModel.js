import mongoose from 'mongoose';

const GenerativeModel = new mongoose.Schema({
    response: {
        type: String, 
        required: true, 
    },

}, {
    timestamps: true,
}); 

const Gemini = new mongoose.model('Gemini', GenerativeModel);

export default Gemini;

