import React, { useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
function Chatengine() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="card flex justify-content-center">
      <HiChatBubbleOvalLeft className="box-dash-icon"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="LegalEase"
        visible={visible}
        modal={false}
        style={{ width: "80vw",height:"80vh" }}
        onHide={() => setVisible(false)}
      >
        <ChatEngine
          projectID="81206018-bcbe-4250-9c30-4e97d92b8c7e"
          userName="Pranav"
          userSecret="PCViditt22$"
        />
      </Dialog>
    </div>
  );
}

export default Chatengine;
