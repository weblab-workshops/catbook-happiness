import React, { Component } from "react";
import CatHappiness from "../modules/CatHappiness.js";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catHappiness: 0,
    };
  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userId: this.props.userId }).then((user) => {
      let catHappiness = user.cat_happiness;
      if (catHappiness === undefined) {
        // in case this is an old user who doesn't have a cat_happiness value
        catHappiness = 0;
      }

      this.setState({ user: user, catHappiness: catHappiness });
    });
  }

  incrementCatHappiness = () => {
    post("/api/cat-happiness", { userId: this.props.userId }).then((res) => {
      this.setState({
        catHappiness: res.cat_happiness,
      });
    });
  };

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <>
        <div
          className="Profile-avatarContainer"
          onClick={() => {
            this.incrementCatHappiness();
          }}
        >
          <div className="Profile-avatar" />
        </div>
        <h1 className="Profile-name u-textCenter">{this.state.user.name}</h1>
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div id="profile-description">
              I am really allergic to cats i don't know why i have a catbook
            </div>
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">Cat Happiness</h4>
            <CatHappiness catHappiness={this.state.catHappiness} />
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
            <div id="favorite-cat">corgi</div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
