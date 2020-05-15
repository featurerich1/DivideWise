/* eslint-disable react/prop-types */
// Remember: constructor run -> render runs -> componentDIDMount

// every MAP() function needs a key database id or index id
// have a listitem = props => const {val} = this.props
//<li> that is used everytime you map

import React from "react";
import { connect } from "react-redux";
import { fetchBills, fetchBill } from "../../actions/bill_actions";
import { Link } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";
import AddBills from "./addbills";
import { select } from "../../actions/ui_actions";

class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owes: null,
      owed: null,
      allin: null,
    //   height: `100px`,
    };
    this.calculateTotalYouOwe = this.calculateTotalYouOwe.bind(this);
    // this.getHeight = this.getHeight.bind(this);
  }

  componentDidMount() {
    this.props.fetchBills();
    this.calculateTotalYouOwe();

    // console.log(this.state.height)
    this.getHeight();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.bills !== this.props.bills) {
      // console.log('billsz props has changed.')
      this.calculateTotalYouOwe();
    }
  }

  componentWillUnmount() {
    console.log(5234234);
    //   componentWillUnmount() reactdom.unmountcompponentatnode
  }

  calculateTotalYouOwe() {
    let owes = null;
    let owed = null;
    this.props.bills.forEach((bill) => {
      if (this.props.current_user.id === bill.borrower_id) {
        owes += bill.amount;
      } else {
        owed += bill.amount;
      }
    });
    this.setState({
      owes: owes,
      owed: owed,
      allin: owed - owes,
    });
  }

  findFriendship(nameOfFriend) {
    // console.log(this.props.friends.length)
    // console.log(nameOfFriend)
    // for (let i = 0; i < this.props.friends.length; i++){
    //     console.log(this.props.friends[i].friends_name == nameOfFriend)
    // }
    if (this.props.friends.length == 0) return 1;
    return this.props.friends
      .filter((friend) => {
        return nameOfFriend === friend.friends_name;
      })
      .map((friend) => friend.id)[0];
  }

  getHeight() {
    console.log(this.state.height);
    this.setState({
      height: $(document).height() + "px",
    });
  }

  render() {
    // this.getHeight()
    const red = {
      borderStyle: `solid`,
      width: `30%`,
      borderColor: `#DDDDDD`,
      display: `inline-block`,
      margin: `0 0 0 0`,
      padding: `0 0 0 0`,
      position: `relative`,
      top: `50%`,
      transform: `translateY(-50%)`,
      borderWidth: `0 1px 0 0`,
      color: `#ff652f`,
      textAlign: `center`,
      fontSize: `13px`,
      lineHeight: `16px`,
      fontFamily: `'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif !important`,
      textRendering: `optimizeLegibility`,
    };

    const green = {
      borderStyle: `solid`,
      width: `30%`,
      borderColor: `#DDDDDD`,
      display: `inline-block`,
      margin: `0 0 0 0`,
      padding: `0 0 0 0`,
      textAlign: `center`,
      position: `relative`,
      top: `50%`,
      transform: `translateY(-50%)`,
      borderWidth: `0 1px 0 0`,
      color: `#5bc5a7`,
      fontSize: `13px`,
      lineHeight: `16px`,
      fontFamily: `'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif !important`,
      textRendering: `optimizeLegibility`,
    };

    const redlazy = {
      borderStyle: `solid`,
      width: `30%`,
      display: `inline-block`,
      margin: `0 0 0 0`,
      padding: `0 0 0 0`,
      textAlign: `center`,
      position: `relative`,
      top: `50%`,
      transform: `translateY(-50%)`,
      color: `#ff652f`,
      fontSize: `13px`,
      lineHeight: `16px`,
      fontFamily: `'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif !important`,
      textRendering: `optimizeLegibility`,
    };

    const greenlazy = {
      borderStyle: `solid`,
      width: `30%`,
      display: `inline-block`,
      margin: `0 0 0 0`,
      padding: `0 0 0 0`,
      position: `relative`,
      top: `50%`,
      transform: `translateY(-50%)`,
      color: `#5bc5a7`,
      textAlign: `center`,
      fontSize: `13px`,
      lineHeight: `16px`,
      fontFamily: `'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif !important`,
      textRendering: `optimizeLegibility`,
    };
    // console.log(window.screen.height)
    // console.log(this.state.height)

    return (
      <div
        // className="column YOU_OWE column_main"
        //you_owe gives it a border
        //column main unfloats it 
        className="YOU_OWE column_main"

        style={{ margin: `0px`, padding: `0 0 0 0`, height: `` }}
        //this is necesary otherwise theres padding for the Dashboard top gray panel
      >
        <div
          style={{
            borderBottom: `1px solid #DDDDDD`,
            backgroundColor: `#EEEEEE`,
            display: "flex",
            justifyContent: `space-between`,
            fontWeight: `700`,
            lineHeight: `38px`,
            fontSize: `24px`,
            fontFamily: `Lato`,
            padding: `2.5% 0 2.5% 5%`,
          }}
        >
          {/* <h1 style={{ fontWeight: `700` }}>Dashboard</h1> */}
                <h1 style={{
                    fontSize: `2.2vw`, fontWeight: `700` }}>Dashboard</h1>

          <AddBills></AddBills>
        </div>
        <div
          id="total_balances"
          style={{
            backgroundColor: `#EEEEEE`,
            display: `block`,
            height: ``,
          }}
        >
          {this.state.allin < 0 ? (
            <div style={red}>
              <span className="blackme">total balance</span>$
              {this.state.allin / 100}
            </div>
          ) : (
            <div style={green}>
              <span className="blackme">total balance</span>$
              {this.state.allin / 100}
            </div>
          )}
          {this.state.owes > 0 ? (
            <div style={red}>
              <span className="blackme">you owe</span>${this.state.owes / 100}
            </div>
          ) : (
            <div style={green}>
              <span className="blackme">you owe</span>${this.state.owes / 100}
            </div>
          )}
          {this.state.owed < 0 ? (
            <div style={redlazy}>
              <span className="blackme">you are owed</span>$
              {this.state.owed / 100}
            </div>
          ) : (
            <div style={greenlazy}>
              <span className="blackme">you are owed</span>$
              {this.state.owed / 100}
            </div>
          )}
        </div>
        <div style={{ display: `flex`, flexWrap: `wrap`, height: `` }}>
          <div
            style={{
              width: `50%`,
              textAlign: `center`,
              margin: `0 auto`,
            }}
            className="columnheaders"
          >
            YOU OWE
          </div>
          <div
            style={{
              width: `50%`,
              textAlign: `center`,
              margin: `0 auto`,
            }}
            className="columnheaders"
          >
            YOU ARE OWED
          </div>


            {/* MOSTLY WRITTEN LEFT SIDE that needs margin on the left image */}
          <div
            style={{
              height: `${this.state.height}`,
              width: `47%`,
              borderRight: `1px solid`,
              borderColor: `#DDDDDD`,
            }}
          >
            {this.props.bills.map((bill) =>
              bill.borrower_id === this.props.current_user_id ? (
                <div
                  className="greyhover"
                  style={{ display: `flexbox`, minWidth: `100%` }}
                >
                  <Link
                    to={`/friends/${this.findFriendship(bill.lender)}`}
                    onClick={() =>
                      this.props.select(this.findFriendship(bill.lender))
                    }
                    style={{ textDecoration: `none` }}
                  >
                    {eval(`avatar` + (this.findFriendship(bill.lender) % 7)) !=
                    "avatarNaN" ? (
                      <img
                        src={window.eval(
                          `avatar` + (this.findFriendship(bill.lender) % 7)
                        )}
                        style={{
                          width: `35px`,
                          height: `35px`,
                          margin: "10px 16px 10px 0",
                          display: `inline-block`,
                          verticalAlign: `middle`,
                        }}
                      ></img>
                    ) : null}

                    <div key={bill.id} style={{ display: `inline-block` }}>
                      {new Date(bill.created_at).toLocaleDateString("en-US")}
                      <br />
                      {bill.borrower}
                      &nbsp;owes {bill.lender} ${bill.amount / 100}
                    </div>
                  </Link>
                </div>
              ) : null
            )}
          </div>
            
            {/* RIGHT SIDE */}

          <div style={{ width: `50%` }}>
            {this.props.bills.map((bill) =>
              bill.lender_id === this.props.current_user_id ? (
                <Link
                  to={`/friends/${this.findFriendship(bill.borrower)}`}
                  onClick={() =>
                    this.props.select(this.findFriendship(bill.borrower))
                  }
                  className="greyhover"
                  style={{ textDecoration: `none` }}
                >
                  <p key={bill.id}>
                    <span>
                      {new Date(bill.created_at).toLocaleDateString("en-US")}
                      <br />
                      {bill.borrower}
                      &nbsp;owes {bill.lender} ${bill.amount / 100}
                    </span>
                  </p>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mSTP = (state) => {
  return {
    bills: Object.values(state.entities.bills),
    current_user: state.entities.users[state.session.id],
    current_user_id: state.session.id,
    friends: Object.values(state.entities.friends),
  };
};

const mDTP = (dispatch) => {
  return {
    fetchBills: () => dispatch(fetchBills()),
    openModal: (modal) => dispatch(openModal(modal)),
    select: (friendshipId) => dispatch(select(friendshipId)),
  };
};

export default connect(mSTP, mDTP)(Bills);

// something in mdtp is called with the callback with dispatch in it only after that dispatch is called then is map state to props called which is an update
// that will call componentdidupdate
// then render is called then child components get a updated prop if they do then they get rerendered