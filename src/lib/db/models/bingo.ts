import mongoose from "mongoose";

const bingoSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    default: () => Math.random().toString(36).substr(2, 9),
  },
  image: {
    type: String,
  },
  items: {
    type: [String],
    required: true,
  },
});

const Bingo = mongoose.models.Bingo ?? mongoose.model("Bingo", bingoSchema);

export default Bingo;
