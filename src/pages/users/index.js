import React, { useState, useEffect, useCallback, useContext } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Modal from "@mui/material/Modal";
import all_orders from "../../constants/orders";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "../styles.css";
import { UserContext } from "../../userContext";
import { LoadingButton } from "@mui/lab";
import SmileIcon from "@material-ui/icons/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  pt: 2,
  px: 4,
  pb: 3,
};

const InstertModal = ({ isVisble, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const addItem = () => {
    setLoading(true);
    fetch("https://dev.theherowarsguys.com/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "uw-auth-token": `dk4EGjhk91h7ejLNLq4Ogdfgd@#$sdfIJk5jlf690g`,
      },
      body: JSON.stringify({
        email,
        phone,
        password1,
        password2,
        first_name,
        last_name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "UNSUCCESS") {
          alert("please check your information");
        }
        handleClose();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <Modal
      onBackdropClick={handleClose}
      open={isVisble}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">Create new user</h2>
        <TextField
          autoComplete="given-name"
          name="firstName"
          margin="normal"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
          required
          fullWidth
          // id="firstName"
          label="First Name"
          autoFocus
        />
        <TextField
          required
          margin="normal"
          fullWidth
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
          // id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
        />
        <TextField
          required
          margin="normal"
          fullWidthvalue={email}
          onChange={(e) => setEmail(e.target.value)}
          // id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          required
          fullWidth
          // id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label="Phone"
          margin="normal"
          name="phone"
          autoComplete="phone"
        />
        <TextField
          required
          fullWidth
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          name="password1"
          label="Password"
          margin="normal"
          type="password"
          // id="password1"
          autoComplete="new-password"
        />
        <TextField
          required
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          fullWidth
          name="password2"
          label="Password repeat"
          margin="normal"
          type="password"
          // id="password2"
          autoComplete="new-password"
        />
        <LoadingButton
          onClick={addItem}
          style={{ marginTop: 10 }}
          loading={loading}
          variant="outlined"
        >
          instert user
        </LoadingButton>
      </Box>
    </Modal>
  );
};

const UpdateModal = ({ isVisble, handleClose, data }) => {
  console.log("data :>> ", data);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [first_name, setFirst_name] = useState(data.first_name);
  const [last_name, setLast_name] = useState(data.last_name);
  const { user } = useContext(UserContext);
  // const [password1, setPassword1] = useState("");
  // const [password2, setPassword2] = useState("");
  const addItem = () => {
    setLoading(true);
    fetch(`https://dev.theherowarsguys.com/api/user/${data.user_id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
      body: JSON.stringify({
        email,
        phone,
        first_name,
        last_name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data :>> ", data);
        if (data.status == "UNSUCCESS") {
          alert("please check your information");
        }
        handleClose();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <Modal
      onBackdropClick={handleClose}
      open={isVisble}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">Edit user</h2>
        <TextField
          autoComplete="given-name"
          name="firstName"
          margin="normal"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
          required
          fullWidth
          // id="firstName"
          label="First Name"
          autoFocus
        />
        <TextField
          required
          margin="normal"
          fullWidth
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
          // id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
        />
        <TextField
          required
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          required
          fullWidth
          // id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label="Phone"
          margin="normal"
          name="phone"
          autoComplete="phone"
        />
        {/* <TextField
          required
          fullWidth
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          name="password1"
          label="Password"
          margin="normal"
          type="password"
          // id="password1"
          autoComplete="new-password"
        />
        <TextField
          required
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          fullWidth
          name="password2"
          label="Password repeat"
          margin="normal"
          type="password"
          // id="password2"
          autoComplete="new-password"
        /> */}
        <LoadingButton
          onClick={addItem}
          style={{ marginTop: 10 }}
          loading={loading}
          variant="outlined"
        >
          edit user
        </LoadingButton>
      </Box>
    </Modal>
  );
};

function Users() {
  const [search, setSearch] = useState("");
  const [lootBoxes, setLootBoxes] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [selected, setSelected] = useState("ID");
  const { user } = useContext(UserContext);
  const [insertVisible, setInsertVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateItem, setUpdateItem] = useState();
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");

  const getResponse = useCallback(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
    };
    const pager =
      email == "" && first_name == "" && last_name == "" && phone == ""
        ? page
        : 1;
    const response = await fetch(
      `https://dev.theherowarsguys.com/api/users?page=${pager}&email=${email}&firstName=${first_name}&lastName=${last_name}&phone=${phone}`,
      requestOptions
    );
    const data = await response.json();
    console.log("data :>> ", data);
    return data;
  }, [email, first_name, last_name, page, phone, user.access]);

  useEffect(() => {
    getResponse().then((data) => {
      setPagination(calculateRange(data.pageTotal));
      setLootBoxes(data.user);
      setPage(data.page);
    });
  }, [getResponse, page, insertVisible]);

  // Search

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
  };

  return (
    <div className="dashboard-content">
      <DashboardHeader
        onClick={() => setInsertVisible(true)}
        btnText="New User"
      />
      <InstertModal
        isVisble={insertVisible}
        handleClose={() => setInsertVisible(false)}
      />
      {updateVisible && (
        <UpdateModal
          isVisble={updateVisible}
          data={updateItem}
          handleClose={() => setUpdateVisible(false)}
        />
      )}
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Users</h2>
          <div></div>
        </div>

        <table>
          <thead>
            <th>No</th>
            <th>email</th>
            <th>first name</th>
            <th>is active</th>
            <th>last name</th>
            <th>phone</th>
            <th>date</th>
            <th>edit</th>
          </thead>

          <thead>
            <th>
              <span>#</span>
            </th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={email}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={first_name}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => setFirst_name(e.target.value)}
                />
              </div>
            </th>
            <th></th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={last_name}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => setLast_name(e.target.value)}
                />
              </div>
            </th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={phone}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </th>
            <th>
              <span>#</span>
            </th>
          </thead>

          {lootBoxes.length !== 0 ? (
            <tbody>
              {lootBoxes.map((item, index) => (
                <tr key={index}>
                  <td>
                    <span>{index + 1}</span>
                  </td>
                  <td>
                    <span>{item.email}</span>
                  </td>
                  <td>
                    <span>{item.first_name}</span>
                  </td>
                  <td>
                    <span>{item.is_active.toString()}</span>
                  </td>
                  <td>
                    <span>{item.last_name}</span>
                  </td>
                  <td>
                    <span>{item.phone}</span>
                  </td>
                  <td>
                    <span>
                      {new Date(item.date_joined).getFullYear() +
                        "-" +
                        (new Date(item.date_joined).getMonth() + 1) +
                        "-" +
                        new Date(item.date_joined).getDate()}
                    </span>
                  </td>
                  <td>
                    <div
                      onClick={() => {
                        setUpdateItem(item);
                        setUpdateVisible(true);
                      }}
                    >
                      <SmileIcon className="box" htmlColor="gray" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>

        {lootBoxes.length !== 0 ? (
          <div className="dashboard-content-footer">
            {pagination.map((item, index) => (
              <span
                key={index}
                className={item === page ? "active-pagination" : "pagination"}
                onClick={() => __handleChangePage(item)}
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="dashboard-content-footer">
            <span className="empty-table">No data</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
