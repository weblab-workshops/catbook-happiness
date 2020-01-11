# Step 3 Hints

- In `componentDidMount()`, when you request `/api/user`, you can read the initial value of `user.cat_happiness` and set that in react state.

- You'll need to call `POST /api/cat-happiness` in `incrementCatHappiness()`.

- The expression `this.state.catHappiness + 1` doesn't need to appear anywhere in your frontend code. Recall that `POST /api/cat-happiness` should return the updated `cat_happiness` value in the response.

- If you are confused with how to use the response from `GET /api/user` or `POST /api/cat-happiness`, printing it with `console.log()` is always a good place to figure out what they look like.
