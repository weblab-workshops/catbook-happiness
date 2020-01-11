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

## Step 2: Add an API route

We need a new API route, so that whenever the user clicks on their profile picture, we increase the value of `cat_happiness` stored in the database. Here is the specification for this route:

- POST `/api/cat-happiness`
- When this route is called, increase the specified user's cat happiness by 1.
- **Parameters** - `userId`: the ID of the user whose `cat_happiness` to increment
- **Returns**: `{ cat_happiness: (the updated value) }`

### Tips:

## FAQ

why cat-happiness
