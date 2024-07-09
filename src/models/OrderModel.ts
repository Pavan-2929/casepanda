import mongoose, { Document, Model } from "mongoose";

interface Order extends Document {
  prodcutData: object;
  user: object;
  orderStatus: string;
  paymentType: string;
  deliveryDate: Date;
  totalPrice: number;
}

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cash", "online"],
      required: true,
      default: "cash",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
      default: "Pending",
      required: true,
    },
    deliveryDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    totalPrice: {
      type: Number,
      reuired: true,
    },
  },
  { timestamps: true }
);

const OrderModel =
  (mongoose.models?.Order as Model<Order>) ||
  mongoose.model("Order", orderSchema);

export default OrderModel;
