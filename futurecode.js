const renderRoom = () => {
    if (room === 0) return false;

    return (
      <div className="row card chat-room">
        <div className="col l3 sidebar hide-on-small-only ">
          <h4 className="title-font center" id="roomName">
            {room.roomName}
          </h4>
          <br />

          <ul id="user-list" className="user-list  scrollable">
            <li className="btn text-font user-list-element ">
              {" "}
              <span className="left">user</span>{" "}
              <span className="small-ball right white"></span>
              <span className="small-ball right white"></span>
              <span className="small-ball right white"></span>
            </li>
            {updateUsers(users)}
          </ul>

          <br />

          <div>
            <span className="btn disabled lighten-4 text-font left">
              <span className="black-text" id="numUsers">
                {users.length}
              </span>
              <i className="material-icons right black-text">group</i>
            </span>

            <span className="btn disabled lighten-4 text-font right">
              <a className="black-text">Lis92kx8a</a>
              <i className="material-icons right black-text">content_copy</i>
            </span>
          </div>

          <br />
          <br />

          <div className="user-clicked">
            <li className="btn disabled text-font user-list-element ">
              {" "}
              <span className="left">user</span>{" "}
            </li>
          </div>

          <div className="tools">
            <span className="btn-floating red lighten-2 left">
              <i className="material-icons">mic_off</i>
            </span>
            <span className="btn-floating red lighten-2 left">
              <i className="material-icons">person_add</i>
            </span>
            <span className="btn-floating red lighten-2 left">
              <i className="material-icons">block</i>
            </span>
          </div>

          <br />
          <br />
          <br />
          <br />

          <div className="user-bar purple ">
            <h6 className="left white-text title-font">Epic Name</h6>
            <span className="btn-floating pink right">
              <i className="material-icons white-text">mic</i>
            </span>
            <span className="btn-floating pink right">
              <i className="material-icons white-text">call_end</i>
            </span>
            <br />
            <br />
            <br />
          </div>
        </div>
        <div className="col l9 chat-box-background ">
          <div className="chat-box  scrollable2">
            <p className="card msg z-depth-2">
              <span className="red-text title">Name</span>
              <br />
              first message ever
            </p>

            <p className="card msg z-depth-2">
              <span className="red-text title">Name</span>
              <br />
              Hello epic stranger!
            </p>
            {updateChat(chatMessages)}
          </div>

          <form onSubmit={sendMessage} className="input-field  msg-box">
            <input id="chat-input" placeholder="send message" type="text" />
            <button className="btn pink" type="submit">
              <i className="material-icons center">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  };
