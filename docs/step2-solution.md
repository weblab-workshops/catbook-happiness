# Step 2 Solution

```js
router.post("/cat-happiness", (req, res) => {
  User.findById(req.body.userId).then((user) => {
    user.cat_happiness++;
    user.save();

    res.send({ cat_happiness: user.cat_happiness });
  });
});
```

Refer to "Updating a Document" section of http://weblab.to/mongo-snippets

It would also be perfectly fine to use this instead of `findById`:

```js
User.findOne({ _id: req.body.userId });
```
