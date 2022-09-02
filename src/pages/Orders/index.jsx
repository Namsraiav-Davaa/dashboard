import React, { useState, useEffect, useCallback, useContext } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import all_orders from "../../constants/orders";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import SmileIcon from "@material-ui/icons/Edit";
import "../styles.css";
import { UserContext } from "../../userContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

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
  const [loot, setLoot] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const { user } = useContext(UserContext);
  const addItem = () => {
    setLoading(true);
    fetch("https://dev.theherowarsguys.com/api/lootbox/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
      body: JSON.stringify({
        lootbox: loot,
        category,
        quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
        <h2 id="child-modal-title">Create new item</h2>
        <TextField
          margin="normal"
          required
          value={loot}
          onChange={(e) => setLoot(e.target.value)}
          fullWidth
          id="lootbox"
          label="lootbox"
          name="Lootbox"
          autoComplete="false"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          label="Category"
          id="category"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          name="quantity"
          label="Quantity"
          id="quantity"
        />
        <LoadingButton
          onClick={addItem}
          style={{ marginTop: 10 }}
          loading={loading}
          variant="outlined"
        >
          insert item
        </LoadingButton>
      </Box>
    </Modal>
  );
};

const UpdateModal = ({ isVisble, handleClose, data }) => {
  const [loading, setLoading] = useState(false);
  const [loot, setLoot] = useState(data.lootbox);
  const [category, setCategory] = useState(data.category);
  const [quantity, setQuantity] = useState(data.quantity);
  const { user } = useContext(UserContext);
  const addItem = () => {
    setLoading(true);
    fetch(`https://dev.theherowarsguys.com/api/lootbox/${data.lootbox_id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
      body: JSON.stringify({
        lootbox: loot,
        category,
        quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
        <h2 id="child-modal-title">Update item</h2>
        <TextField
          margin="normal"
          required
          value={loot}
          onChange={(e) => setLoot(e.target.value)}
          fullWidth
          id="lootbox"
          label="lootbox"
          name="Lootbox"
          autoComplete="false"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          label="Category"
          id="category"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          name="quantity"
          label="Quantity"
          id="quantity"
        />
        <LoadingButton
          onClick={addItem}
          style={{ marginTop: 10 }}
          loading={loading}
          variant="outlined"
        >
          update
        </LoadingButton>
      </Box>
    </Modal>
  );
};

function Orders() {
  const [search, setSearch] = useState("");
  const [lootBoxes, setLootBoxes] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [selected, setSelected] = useState("ID");
  const { user } = useContext(UserContext);
  const [instertVisible, setIntsertVisible] = useState(false);
  const [updateVisible, setUpdatevisible] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [category, setCategory] = useState('');
  const [lootbox, setLootbox] = useState('');
  const [quantityFrom, setQuantityFrom] = useState('');
  const [quantityTo, setQuantityTo] = useState('');
  const getResponse = useCallback(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
    };
    const pager = category == '' && lootbox == '' ? page : 1;
    const response = await fetch(
      `https://dev.theherowarsguys.com/api/lootboxes?page=${pager}&category=${category}&lootbox=${lootbox}${quantityFrom != '' ? `&quantityFrom=${quantityFrom}` : ''}${quantityTo != '' ? `&quantityTo=${quantityTo}` : ''}`,
      requestOptions
    );
    const data = await response.json();
    return data;
  }, [page, user.access, category, lootbox, quantityFrom, quantityTo]);

  useEffect(() => {
    getResponse().then((data) => {
      setPagination(calculateRange(data.pageTotal));
      setLootBoxes(data.lootboxes);
      setPage(data.page);
    });
  }, [getResponse, page, instertVisible, updateVisible]);

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setLootBoxes(sliceData(all_orders, new_page, 5));
  };

  return (
    <div className="dashboard-content">
      <DashboardHeader
        onClick={() => setIntsertVisible(true)}
        btnText="New item"
      />
      <InstertModal
        handleClose={() => setIntsertVisible(false)}
        isVisble={instertVisible}
      />
      {updateVisible && (
        <UpdateModal
          data={updateData}
          handleClose={() => setUpdatevisible(false)}
          isVisble={updateVisible}
        />
      )}
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Loot boxes</h2>
          <div></div>
        </div>

        <table>
          <thead>
            <th>ID</th>
            <th>CATEGORY</th>
            <th>ITEM</th>
            <th>LOOTBOX</th>
            <th>QUANTITY</th>
            <th>DATE</th>
            <th>EDIT</th>
          </thead>

          <thead>
            <th>
              <span>FILTERS</span>
            </th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={category}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </th>
            <th>
            </th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={lootbox}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => setLootbox(e.target.value)}
                />
              </div>
            </th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={quantityFrom}
                  placeholder="from.."
                  className="dashboard-content-input"
                  onChange={(e) => setQuantityFrom(e.target.value)}
                />
              </div>
              <div className="dashboard-content-search-2">
                <input
                  type="text"
                  value={quantityTo}
                  placeholder="to.."
                  className="dashboard-content-input"
                  onChange={(e) => setQuantityTo(e.target.value)}
                />
              </div>
            </th>
            <th>
              <span>#</span>
            </th>
          </thead>

          {lootBoxes.length !== 0 ? (
            <tbody>
              {lootBoxes.map((order, index) => (
                <tr key={index}>
                  <td>
                    <span>{index + 1}</span>
                  </td>
                  <td>
                    <span>{order.category}</span>
                  </td>
                  <td>
                    <span>{order.item}</span>
                  </td>
                  <td>
                    <span>{order.lootbox}</span>
                  </td>
                  <td>
                    <span>{order.quantity}</span>
                  </td>
                  <td>
                    <span>
                      {new Date(order.created_at).getFullYear() +
                        "-" +
                        (new Date(order.created_at).getMonth() + 1) +
                        "-" +
                        new Date(order.created_at).getDate()}
                    </span>
                  </td>
                  <td>
                    <div
                      onClick={() => {
                        setUpdateData(order);
                        setUpdatevisible(true);
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

export default Orders;
