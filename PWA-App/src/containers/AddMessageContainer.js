import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import AddMessage from '../components/AddMessage'
import guid from 'guid'

const AddMessageContainer = ({ userId, currentChannel, onSendMessage }) => (
    <AddMessage userId={userId} currentChannel={currentChannel} onSendMessage={onSendMessage}/>
)

async function sendMessage(userId, message, currentChannel, socketManager) {
    try {
        var newMessage = 
        {
            Text: message,
            UserId: userId,
            Id: guid.raw(),
            Date: new Date()
        };
        await socketManager.connection.invoke('SendMessage', currentChannel.ChannelName, JSON.stringify(newMessage));
        var scrolldiv = document.getElementById("bottom-div-scroll");
        scrolldiv.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
};

const mapStateToProps = state => ({
    userId: state.userId,
    currentChannel: state.currentChannel
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      onSendMessage: (userId, message, currentChannel) => {
        sendMessage(userId, message, currentChannel, ownProps.socketManager);
      },
    };
};

const AddMessageComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMessageContainer);

export default AddMessageComponent;