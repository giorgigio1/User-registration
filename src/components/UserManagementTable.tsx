import Header from "./Header";
import Toolbar from "./Toolbar";
import { useEffect, useState } from "react";
import axios from "axios";

type UserData = {
  username: string;
  email: string;
  lastLogin: string;
  createdAt: string;
  status: string;
  _id: string;
};

type UserState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: UserData[];
};

const UserManagementTable: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: [],
  });

  const [selcetedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setUser((prevState) => ({
      ...prevState,
      isLoading: true,
      isError: false,
      isSuccess: false,
    }));
    try {
      const response = await axios.get(
        "http://localhost:5000/user/fetch-users",
        {
          headers: {
            Authorization: localStorage.getItem("token"), // Send the token for authentication
          },
        }
      );

      setUser({
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: response.data,
      });
    } catch (error) {
      setUser({
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: [],
      });
    }
  };

  const handleBlockOrUnblockUsers = async (
    whatToDo: "block" | "unblock" | "delete"
  ) => {
    let url =
      whatToDo === "block"
        ? "http://localhost:5000/user/block-users"
        : whatToDo === "unblock"
        ? "http://localhost:5000/user/unblock-users"
        : "http://localhost:5000/user/delete-users";

    try {
      await axios.post(url, selcetedIds, {
        headers: {
          Authorization: localStorage.getItem("token"), // Send the token for authentication
        },
      });

      fetchUsers();
      setSelectedIds([]);
    } catch (error) {
      console.error(error);
    }
  };

  if (user.isLoading && user.data.length === 0) {
    return <div>Loading...</div>;
  }

  if (user.isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Header />
      <div style={{ width: "90%", margin: "0 auto" }}>
        <Toolbar onBlockUser={handleBlockOrUnblockUsers} />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>
                {" "}
                <input
                  type="checkbox"
                  checked={selcetedIds.length === user.data.length}
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      setSelectedIds(user.data.map((user) => user._id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Last login time</th>
              <th>Registration time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {user.data.map((user) => (
              <tr
                key={user._id}
                className={user.status === "blocked" ? "bg-light" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selcetedIds.includes(user._id)}
                    onChange={(e) => {
                      const { checked } = e.target;
                      if (checked) {
                        setSelectedIds((prevState) => [...prevState, user._id]);
                      } else {
                        setSelectedIds((prevState) =>
                          prevState.filter((id) => id !== user._id)
                        );
                      }
                    }}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.lastLogin}</td>
                <td>{user.createdAt}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;
