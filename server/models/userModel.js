import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    },
    userType: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});



userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.updateProfile = async function (name, email, currentPassword, newPassword, confirmPassword) {
    if (name) {
        this.name = name;
    }

    if (email) {
        this.email = email;
    }

    if (newPassword) {

        if (newPassword !== confirmPassword) {
            throw new Error('Passwords do not match');
        }


        if (currentPassword) {
            const isMatch = await this.comparePassword(currentPassword);
            if (!isMatch) {
                throw new Error('Current password is incorrect');
            }
        }


        this.password = newPassword;
    }

    // Guardamos los cambios
    await this.save();
};


export default mongoose.model('User', userSchema);
