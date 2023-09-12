import React from "react";

import Create from "../(main)/NavButtons/createGame";
import Join from "../(main)/NavButtons/joinGame";

function SideNav({ username }) {
  return (
    <div className="w-full h-full text-white p-6 bg-black">
      This is the header {username?.username}
      <div className="flex flex-col gap-4">
        {/* <Create user={username} />
        <Join /> */}
      </div>
    </div>
  );
}

export default SideNav;
