const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    category: {
      type: String,
      enum: ["Weather","Technology", "Business", "Sports", "Entertainment", "Other"],
      default: "Other",
    },
    imageUrl: {
      type: String,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;
