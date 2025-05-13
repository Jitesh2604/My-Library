import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: "String",
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: "String",
        required: true,
        unique: true
    } 
}, {timestamps: true});

// Hash password before saving
userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password method
userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);