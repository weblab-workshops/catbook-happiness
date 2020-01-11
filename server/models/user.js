const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  cat_happiness: { type: Number, default: 0 },
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
