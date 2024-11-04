const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    product_id: { require: true, type: String },
    owner_id: { required: true, type: Schema.Types.ObjectId, ref: "User" },
    phone_number: { require: true, type: String },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const notificationModel = model("Notification", notificationSchema);

module.exports = notificationModel;
