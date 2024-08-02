import mongoose from "mongoose";

const UserSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    academicSituation: {
        satScore: {
            type: Number,
            default: 0
        }, 
        actScore: {
            type: Number,
            default: 0,
        },
        gpa: {
            type: Number,
            default: 0.0, // Utilize a default floating number as the default
        },
        extraCurriculars: {
            type: String, 
            default: 'Not Provided',
        }
    },
    interests: {
        hobbies: {
            type: String, 
            default: 'Not Provided'
        },
    },
    basicInfo: {
        residency: {
            type: String, 
            default: 'Not Provided',
        },
        currentGrade: {
            type: String, 
            default: 'Not Provided',
        },
        financialSituation: {
            type: String, 
            default: 'Not Provided',
        },
        description: {
            type: String, 
            default: 'Not Provided',
        }
    },
    dreamtUnis: {
        type: String, 
        default: 'Not Provided'
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);

export default User;