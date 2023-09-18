import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import LayersIcon from "@mui/icons-material/Layers";
import PollIcon from "@mui/icons-material/Poll";
import PersonIcon from '@mui/icons-material/Person';
import "./Updates.css";

const Updates = () => {
  return (
    <div>
      <h4 className="margin0 top30">Upcoming Features</h4>
      <div className="flex_baselineStart_center">

      <div class="flip-card ">
    <div class="flip-card-inner">

      <div class="flip-card-front flex_center_center flex_column color1">
      <span>
            <FolderIcon className="updates_font"></FolderIcon>
          </span>
          <p>Notes/Asgmt Sharing</p>
      </div>
      <div class="flip-card-back flex_center_center color1">
  " You Can Share Assignments And Also Download Notes Provided By The Teacher. "
        
      </div>
    </div>
  </div>

  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front flex_center_center flex_column color2">
      <span>
            <PollIcon className="updates_font"></PollIcon>
          </span>

          <p>Poll option</p>
      </div>
      <div class="flip-card-back flex_center_center color2">
      " The Poll Is Used To Take Decisions And Feedback For Teachres. "
      
      </div>
    </div>
  </div>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front flex_center_center flex_column color3">
      <span>
            <LayersIcon className="updates_font"></LayersIcon>
          </span>

          <p>Color Themes</p>
      </div>
      <div class="flip-card-back flex_center_center color3 ">
      " Multiple Color Themes. "
      
      </div>
    </div>
  </div>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front flex_center_center flex_column color4">
      <span>
            <PersonIcon className="updates_font updates_font1"></PersonIcon>
          </span>

          <p>OAuth</p>
      </div>
      <div class="flip-card-back flex_center_center color4 ">
      " Oauth Will Use To Sign In Using your Google Account. "
      
      </div>
    </div>
  </div>
        
        
        
      </div>
    </div>
  );
};

export default Updates;
