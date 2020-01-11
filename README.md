# catbook-happiness

Saving cat happiness to the database! This exercise will give you extra practice using mongoose, and will get you more familiar with the `User` model.

## End Result

Visit your profile (or someone else's profile). You can click on the profile picture to increase cat happiness (already implemented in workshop 2).

But now, when you referesh, your cat happiness is still there! You can also visit someone else's profile and increase their cat happiness permanently.

![gif of solution](https://raw.githubusercontent.com/weblab-workshops/catbook-happiness/0ec86d485c989bb71defbeb315fc64fd0d17bbeb/docs/complete.gif)

## Getting started

Run the following commands

```bash
git clone https://github.com/weblab-workshops/catbook-happiness.git
cd catbook-happiness
npm install

npm start
npm run hotloader # in a separate window
```

## Step 1: Change the user model

For every user, we want to store their cat happiness to the database.
Modify the file `server/models/user.js` and add the following field to the schema:

- `cat_happiness` (its type is `Number`)

When a new user signs up, their `cat_happiness` should be initialized to 0. To do this, you can modify `auth.js` and add `cat_happiness: 0` to `newUser` (inside of `getOrCreateUser()`).

But you still might run into an issue. When your user document was created during workshop 6, we hadn't added this in yet. That means, in your user document right now, `cat_happiness === undefined`. This is a problem! We want your happiness to start at `0`, not `undefined`.

Fortunately, mongoose has an convenient solution. You can specify a **default value** for a schema field, so if `cat_happiness` was never set, it will automatically default to `0` when you try to use it.

Add a default value to the `cat_happiness` field. You can [view the mongoose documentation](https://mongoosejs.com/docs/defaults.html).

[Step 1 Solution](https://github.com/weblab-workshops/catbook-happiness/blob/master/docs/step1-solution.md)

## Step 2: Add an API route

We need a new API route, so that whenever the user clicks on their profile picture, we increase the value of `cat_happiness` stored in the database. Here is the specification for this route:

- POST `/api/cat-happiness`
- When this route is called, increase the specified user's cat happiness by 1.
- **Parameters** - `userId`: the ID of the user whose `cat_happiness` to increment
- **Returns**: `{ cat_happiness: (the updated value) }`

Implement this behavior. This may come in handy: http://weblab.to/mongo-snippets

[Step 2 Solution](https://github.com/weblab-workshops/catbook-happiness/blob/master/docs/step2-solution.md)

## Step 3: Update the frontend

Now, let's hook it up to the frontend. This will only involve changing one file: `Profile.js`. Using our new endpoint, modify this file so that cat happiness is preserved when you refresh the page. If you don't know where to start, check out [these hints](https://github.com/weblab-workshops/catbook-happiness/blob/master/docs/step3-hints.md).

Then, you're done! The result should look like the gif at the top of this page.

We'll need to modify this, so that instead of simply adding 1 to the state, we instead send a `POST` request to our new endpoint.

To view final solution for this assignment:

```bash
# save your changes first by committing to git
git add .
git commit "my changes"

# view the completed code
git checkout complete

# to go back to viewing your work, you can type:
git checkout master
```

[Step 3 Solution](https://github.com/weblab-workshops/catbook-happiness/blob/master/docs/step3-solution.md)

## Extra Credit

In the branch `complete`, the code basically works, but there are a few tricky cases where stuff might go wrong. Solving these involves some more advanced concepts we haven't covered yet. But if you're feeling especially ambitious, you can keep reading.

### Bug in the backend

The backend in branch works pretty much fine, but there is a case where if you and your friends are spamming cat happiness fast enough, some of your clicks may not seem to go through. (e.g. after clicking 1000 times, cat happiness is only 973).

This occurs due to a _race condition_ in the way we handle `/api/cat-happiness`.

```js
User.findById(req.body.userId).then((user) => {
  user.cat_happiness++;
  user.save();
});
```

Suppose two requests for `/api/cat-happiness` execute at nearly the exact same time. Both will run the first line, and ask for the user document. Mongoose gives both processes the following response:

```js
{
    _id: "123abc456def",
    name: "meme man",
    googleid: 987654,
    cat_happiness: 0,
}
```

Then, both procceses run lines 2. Now, for each of them, `user` looks like this:

```js
{
    _id: "123abc456def",
    name: "meme man",
    googleid: 987654,
    cat_happiness: 1,
}
```

Do you see the problem? When this gets saved into the database, `cat_happiness === 1`, even though there were two requests that came in. One click got lost! How might we solve this? (we may get to this in Advanced MongoDB next week)

### Bug in the frontend

You might experience a bug with the Profile button in the navbar. If you go to someone else's profile, and then click on the "Profile" button, you'll notice that nothing on the page changes, even though the URL changes.

Can you figure out why this might be happening? (we may get to this in Advanced React lecture next week)
