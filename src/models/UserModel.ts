import mongoose, { Document, Model } from "mongoose";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  forgetPasswordExpiry: Date;
}

interface Address extends Document {
  phone: number;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: number;
}

const addressSchema = new mongoose.Schema({
  phone: {
    type: Number,
  },
  street: {
    type: String,
  },
  area: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
    verifyCode: {
      type: String,
      required: true,
    },
    verifyCodeExpiry: {
      type: Date,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    forgetPasswordExpiry: {
      type: Date,
      default: Date.now(),
    },
    address: {
      type: addressSchema,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models?.User as Model<User>) || mongoose.model("User", userSchema);

export default UserModel;
