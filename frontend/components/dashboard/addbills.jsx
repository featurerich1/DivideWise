import React from 'react';
import { connect } from 'react-redux';
import { withRouter, match } from 'react-router-dom'
import { openModal } from '../../actions/modal_actions';



const AddBills = ({ currentUser, openModal, match }) => {

    const sessionLinks = () => (
        <div style={{ width: `auto`, position: `relative`, left:`20%`, margin: `0 10px 0 0`, display:`flex`}}>
            <button style={{width: `auto`}}className='orangebutton'  onClick={() => openModal('BillCreate')}>Add an Expense</button>
            &nbsp;
            <button style={{ width: `auto`,backgroundColor:`#48be9d` }} className='orangebutton' onClick={() => openModal('PaymentCreate')}>Settle up</button>
            &nbsp;
        </div>

    );


    return (
        sessionLinks()
    );
};


const mapStateToProps = ({ session }) => ({
    currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBills));
