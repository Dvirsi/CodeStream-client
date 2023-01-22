import "./Main.css";
import { useEffect, useState } from "react";
import blocksUtils from "../../utils/codeBlockService";
import { useNavigate } from "react-router-dom";
function Main() {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState([]);

  const handleChooseCodeView = (selectedBlockId) => {
    if (selectedBlockId !== "") {
      navigate(`block/${selectedBlockId}`);
    }
  };

  const getColorDifficulty = (dif) => {
    if (dif == "Easy") {
      return "#23B031";
    } else if (dif == "Medium") {
      return "#c55C20";
    } else {
      return "red";
    }
  };

  useEffect(() => {
    const getAllBlocks = async () => {
      try {
        const { data } = await blocksUtils.getAllBlocks();
        setBlocks([...data]);
      } catch (err) {
        throw Error(err.response.data);
      }
    };
    getAllBlocks();
  }, []);

  return (
    <div className="mainContainer">
      <a href="https://code-stream-moveo.netlify.app">
        <div className="logo">
          <img src={require("../../icons/logo.png")} alt="Logo" />
        </div>
      </a>
      <div className="pageTitle ">
        <h1>Choose code block</h1>
      </div>
      {blocks.map((block) => {
        return (
          <div
            key={block._id}
            className="codeBlock"
            onClick={() => handleChooseCodeView(block._id)}
          >
            <h1 className="title">{block.title}</h1>
            <br />
            <p className="description">{block.description}</p>

            <div
              className="difficultyLabel"
              style={{
                backgroundColor: getColorDifficulty(block.difficulty),
              }}
            >
              <p className="difficultyLabelText ">{block.difficulty}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Main;
