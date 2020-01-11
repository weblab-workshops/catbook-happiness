# Step 1 Solution

```js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  cat_happiness: { type: Number, default: 0 },
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
```

This solution is a one-line change that uses the "default" option described in [the mongoose documentation](https://mongoosejs.com/docs/defaults.html).
