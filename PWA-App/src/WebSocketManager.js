//import { hubConnection } from 'signalr-no-jquery';
import { store } from './index'
import { allChannelsRetrieved, singleChannelRetrieved, updateMessageList } from './actions'
import * as signalR from '@aspnet/signalr-client'

class WebSocketManager {

    initialize(url, hubName, userId) {
        var params = "?UserId=" + userId;
        this.connection = new signalR.HubConnection(url + params);   
    }

    addMessage = function(newMessage) {
        var messageList = [...store.getState().messages, newMessage];
        store.dispatch(updateMessageList(messageList));
    }

    retrieveChannelDetails = function(channelDetails) {
        var newUserList = [];
        channelDetails.Users.forEach(function(element) {
          newUserList.push(element.ClientId.substring(0, 8));
        }, this);
        store.dispatch(singleChannelRetrieved(channelDetails, channelDetails.Messages, newUserList));
    }

    retrieveAllChannels = function(channels) {
        store.dispatch(allChannelsRetrieved(channels));
    }

    async startConnection() {
        try {
            console.log(this.connection)
            await this.connection.start()
            console.log('Now connected with ID : ' + this.connection.connection.connectionId);
            this.retrieveMainChannelDetails()
            this.connection.invoke('getAllChannels');
        }
        catch (error) {
            console.log("Could not connect");
        }
    }

    retrieveMainChannelDetails() {
        this.connection.invoke('getChannelDetails', "Main")
    }
}

export default WebSocketManager;