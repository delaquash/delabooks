import  mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUSER {
    username: string;
    password: string;
    email: string;
    profileImage: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    }
}, 
{
    timestamps: true
})

// hash password before saving to database
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    if(this.password.length < 6) return next(new Error("Password must be at least 6 characters"));
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.comparePassword = async function(userPassword: string) {
    return bcrypt.compare(userPassword, this.password);
}

const User = mongoose.model<IUSER>("User", UserSchema);

export default User