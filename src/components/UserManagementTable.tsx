import Header from "./Header";
import Toolbar from "./Toolbar";
import { useEffect, useState } from "react";
import { baseApi } from "../baseAPI";
import jwtDecode from "jwt-decode";

type UserData = {
  fullname: string;
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
      const response = await baseApi.get("user/fetch-users", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

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
        ? "user/block-users"
        : whatToDo === "unblock"
        ? "user/unblock-users"
        : "user/delete-users";

    const token = localStorage.getItem("token");

    try {
      await baseApi.post(url, selcetedIds, {
        headers: {
          Authorization: token,
        },
      });

      const decodeToken = jwtDecode<{ userId: string }>(token!);

      if (whatToDo === "block" && selcetedIds.includes(decodeToken.userId)) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

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
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{new Date(user.lastLogin).toLocaleString()}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
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
