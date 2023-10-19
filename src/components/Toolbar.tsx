import { BsLockFill, BsFillUnlockFill, BsFillTrashFill } from "react-icons/bs";

const Toolbar = ({
  onBlockUser,
}: {
  onBlockUser: (whatToDo: "block" | "unblock" | "delete") => void;
}) => {
  return (
    <figure className="d-flex py-2">
      <button
        onClick={() => onBlockUser("block")}
        className="border p-2 text-danger"
      >
        <BsLockFill style={{ fontSize: "30px", cursor: "pointer" }} />
        <span>Block</span>
      </button>
      <button onClick={() => onBlockUser("unblock")} className="p-2 mx-3">
        <BsFillUnlockFill style={{ fontSize: "30px", cursor: "pointer" }} />
      </button>
      <button onClick={() => onBlockUser("delete")} className="p-2">
        <BsFillTrashFill style={{ fontSize: "30px", cursor: "pointer" }} />
      </button>
    </figure>
  );
};

export default Toolbar;
