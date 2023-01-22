import "./CodeBlock.css";
import { useEffect, useState } from "react";
import blocksUtils from "../../utils/codeBlockService";
import { useParams, Link } from "react-router-dom";
import io from "socket.io-client";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const socket = io.connect("https://moveo-interview.herokuapp.com");

function CodeBlock() {
  const params = useParams();
  const [codeBlock, setCodeBlock] = useState({});
  const [receivedCode, setReceivedCode] = useState(null);
  const [isStudent, setIsStudent] = useState(false);

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [showFinishPopup, setShowFinishPopup] = useState(false);

  useEffect(() => {
    const id = params.blockId;
    async function getBlock() {
      try {
        const blockObj = await blocksUtils.getBlockById(id);
        setCodeBlock(blockObj.data);
      } catch (err) {
        console.log(err);
      }
    }
    setRoom(id);
    socket.emit("join_room", id);
    getBlock();
  }, []);

  useEffect(() => {
    const isMentor = socket.id === codeBlock.mentorSocketId;
    setIsStudent(!isMentor);
  }, [codeBlock]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedCode(data.message);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("send_message", { message, room });
    if (codeBlock.solution) {
      if (
        codeBlock.solution.includes(message) ||
        codeBlock.solution.includes(receivedCode)
      ) {
        setShowFinishPopup(true);
      }
    }
  }, [receivedCode]);

  return (
    <div className="CodeBlockPage">
      {isStudent ? (
        <div className="studentNameDiv">
          <h6 className="name">Student</h6>
        </div>
      ) : (
        <div className="mentorNameDiv">
          <h6 className="name">Mentor</h6>
        </div>
      )}
      <div className="taskTitleDiv">
        <h2>{codeBlock.title}</h2>
      </div>
      <div className="taskDescriptionDiv">
        <p className="taskDescriptionContent">{codeBlock.description}</p>
      </div>
      <div className="codeBlockWrapper">
        {/* only for the student */}
        {isStudent && (
          <div className="studentDisplay">
            <div className="codeBlockPlaceholderDiv">
              <textarea
                className="codeBlockPlaceholder"
                disabled
                defaultValue={codeBlock.blockPlaceholder}
              ></textarea>
            </div>

            <div className="studentCodeBlock">
              <textarea
                autoFocus
                onFocus={(e) => e.currentTarget.setSelectionRange(7, 32)}
                className="textBoxStudent"
                rows="6"
                onChange={(e) => {
                  setMessage(e.target.value);
                  setReceivedCode(e.target.value);
                }}
                defaultValue="return //Enter your code here..."
              ></textarea>
            </div>
          </div>
        )}

        {/* Show the code with syntax highlight */}
        <div className="highligihtCode">
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {codeBlock.blockPlaceholder}
          </SyntaxHighlighter>
          <div className="hilightText">
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {isStudent ? message : receivedCode}
              {/* {receivedCode} */}
            </SyntaxHighlighter>
          </div>
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {"}"}
          </SyntaxHighlighter>
        </div>
      </div>
      <div>
        {codeBlock.solution?.length > 0 && (
          <Popup
            trigger={
              <div className="solutionButtonDiv">
                <a className="solutionButton"> Solution</a>
              </div>
            }
            position="right"
          >
            <div className="popup-content">{codeBlock.solution[0]}</div>
          </Popup>
        )}
      </div>
      <Popup open={showFinishPopup} onClose={() => setShowFinishPopup(false)}>
        <div className="popup-content">
          <img src={require("../../icons/smile.jpg")} alt="smile" />
        </div>
      </Popup>
      <div className="toLobbyButtonDiv">
        <a href="https://code-stream-moveo.netlify.app">
          <div className="logo">
            <img src={require("../../icons/logo.png")} alt="Logo" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default CodeBlock;
