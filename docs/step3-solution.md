# Step 3 Solution

```js
  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userId: this.props.userId }).then((user) => {
      this.setState({ user: user, catHappiness: user.cat_happiness });
    });
  }
```

I made a modification to the 4th line. We can read the value of `cat_happiness` passed in from the user document, and use this in order to initialize the value of `cat_happiness` that shows up when you first load the page.

```js
incrementCatHappiness = () => {
  post("/api/cat-happiness", { userId: this.props.userId }).then((res) => {
    this.setState({
      catHappiness: res.cat_happiness,
    });
  });
};
```

This code gets run every single time you click on the profile picture. (that's a lot of POST requests!). Note how I never needed to compute `this.state.catHappiness + 1` in the frontend.
This is because the backend does the math for us, and then tells us what the new value should be in `res.cat_happiness`.
