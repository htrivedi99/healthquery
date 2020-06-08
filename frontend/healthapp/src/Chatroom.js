import React, { Component } from 'react';
import { Container, Row, Col, Form, Button} from "react-bootstrap";
import axios from "axios";
import { myFirebase, db, auth } from "./firestore.js";
import sendIcon from "./send.svg";
import "./Chatroom.css";

const API_BASE = "http://localhost:5000/healthquery-e1a26/us-central1/api";

class Chatroom extends Component {
    constructor(props){
        super(props);
        this.state = {
            chats: null,
            userId: "",
            docId: "",
            documentId: "",
            newChatHistory: null,
            text: ""
        };
        this.messages = [];
        this.removeListener = null;
    }
    async componentDidMount(){
        let docId = this.props.location.state.docId;
        let newChatHistory = this.props.location.state.newChatHistory;
        let uid = localStorage.getItem("userId");

        let documentId = uid + docId;
        documentId = documentId.replace(/\s/g, '');

        this.setState({userId: uid, newChatHistory, docId, documentId });

        
        if (this.removeListener) {
            this.removeListener();
        }
       if(!newChatHistory){
       this.removeListener = await db.collection("chat")
                                    .doc(documentId)
                                    .collection("testcollection")
                                    .orderBy("createdAt", "asc")
                                    .onSnapshot(snapshot => {
                                        let chats = snapshot.docChanges().map(change => change.doc.data());
                                        this.setState({ chats });
                                    })

                            }
        
        
       
    }
    getAllChatMessages = async() => {
        if(!this.state.newChatHistory && this.state.documentId !== ""){
            if (this.removeListener) {
                this.removeListener();
            }
          
           this.removeListener = await db.collection("chat")
                                        .doc(this.state.documentId)
                                        .collection("testcollection")
                                        .orderBy("createdAt", "asc")
                                        .onSnapshot(snapshot => {
                                            let chats = snapshot.docChanges().map(change => change.doc.data());
                                            this.setState({ chats });
                                        })
    
                                
        }
    }

    displayMessages = () => {
        //await this.getAllChatMessages();
        // <div style={{textAlign: "right", justifyContent: "right", alignItems: "right", backgroundColor: "green", paddingBottom: "2%"}}>
        //                 <span>{message['text']}</span>
        //             </div>

    //     <div style={{textAlign: "left", justifyContent: "left", alignItems: "left"}}>
    //     <span>{message['text']}</span>
    // </div>
       if(this.state.chats){
        console.log("view messages", this.state.chats);
        let viewMessagesList = [];
        this.state.chats.forEach((message) => {
            if(message['uid'] === this.state.userId){
                viewMessagesList.push(
                    
                        <div className="bubbleWrapper">
                            <div className="inlineContainer own">
                                <div className="ownBubble own">
                                    {message['text']}
                                </div>
                            </div>
                        </div>
                    
                    
                );
            }else{
                viewMessagesList.push(
                   
                        <div className="bubbleWrapper">
                            <div className="inlineContainer">
                                <div className="otherBubble other">
                                    {message['text']}
                                </div>
                            </div>
                        </div>
                   
                   
                );
            }
        })
       
        return viewMessagesList;   
        }else{
            return null;
        }
        return null;
       
    }

    writeNewMessage = async(e) => {
        e.preventDefault();
        this.setState({text: ""});
        if(this.state.newChatHistory){
            // let documentId = this.state.userId + this.state.docId;
            // documentId = documentId.replace(/\s/g, '');
            // console.log(documentId);
            let data = {
                uid1: this.state.userId,
                uid2: this.state.docId,
                text: this.state.text
                
            }
            await axios.post(API_BASE + "/createNewChat", data)
            .then(res => {
                if(res.status === 200){
                    this.setState({ newChatHistory: false}, () => {this.getAllChatMessages()});
                }
            })
        }else{
            let data = {
                uid1: this.state.userId,
                uid2: this.state.docId,
                text: this.state.text
                
            }
            await axios.post(API_BASE + "/addChat", data)
            .then(res => {
                if(res.status === 200){
                    this.getAllChatMessages();
                }
            })
        }
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
     }

    render(){
        console.log(this.state);
        //console.log(this.state.chats);
        return(
            <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
                <div style={{flex: 1}}>
                    <div style={{textAlign: "center"}}>
                        <h1>Chatroom</h1>
                    </div>
                    <hr/>
                    
                    <div>
                        {this.displayMessages()}
                    </div>
                    {/* <button onClick={this.writeNewMessage}>
                        Send Message
                    </button> */}
                </div>
                <form onSubmit={this.writeNewMessage}>
                    <div style={{backgroundColor: "#36356b", color: "white", bottom: 0, width: "100%", position: "relative", height: "10vh", display:"flex"}}>
                        
                            
                        
                        <div style={{width: "80%", display: "inline"}}>
                            <input style={{ borderRadius: "18px", width: "100%", background: "#fff", height: "30px", paddingLeft: "1%", marginLeft:"5%", marginTop: "2%", fontSize:18, outline: "None"}}
                                    onChange={this.handleChange}
                                    value={this.state.text}
                                    name="text"
                            />
                        </div>  
                        <div style={{width: "35%", display: "inline"}}>
                            <button style={{borderRadius: "50%", width: "12%", height: "60%", marginLeft: "40%", marginTop: "4%", paddingLeft: "3%", cursor: "pointer"}}
                                    type="submit"
                            >
                                <img src={sendIcon} style={{width: "70%", height: "70%"}}/>
                            </button>
                        </div>         
                    </div>
                </form>

            </div>
            

        );
    }
}

export default Chatroom;