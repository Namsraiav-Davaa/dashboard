import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";

import all_orders from "../../constants/orders";
import { calculateRange, sliceData } from "../../utils/table-pagination";

import "../styles.css";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import RefundedIcon from "../../assets/icons/refunded.svg";

function Orders() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(all_orders);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [selected, setSelected] = useState("ID");

  useEffect(() => {
    setPagination(calculateRange(all_orders, 5));
    // console.log("all_orders :>> ", all_orders);
    setOrders(sliceData(all_orders, page, 5));
  }, [page]);

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      //   let search_results = orders.filter(
      //     (item) =>
      //       item.first_name.toLowerCase().includes(search.toLowerCase()) ||
      //       item.last_name.toLowerCase().includes(search.toLowerCase()) ||
      //       item.product.toLowerCase().includes(search.toLowerCase())
      //   );
      let search_results = [];
      if (selected === "ID") {
        search_results = orders.filter((item) =>
          item.id.toLowerCase().includes(event.target.value.toLowerCase())
        );
      } else if (selected === "DATE") {
        search_results = orders.filter((item) =>
          item.date.toLowerCase().includes(event.target.value.toLowerCase())
        );
      } else if (selected === "STATUS") {
        search_results = orders.filter((item) =>
          item.status.toLowerCase().includes(event.target.value.toLowerCase())
        );
      } else if (selected === "CUSTOMER") {
        console.log("ccccc");
        search_results = orders.filter(
          (item) =>
            item.last_name
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
            item.first_name
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
        );
        console.log("search_results :>> ", search_results);
        console.log("search :>> ", search);
      } else if (selected === "PRODUCT") {
        search_results = orders.filter((item) =>
          item.product.toLowerCase().includes(event.target.value.toLowerCase())
        );
      } else if (selected === "REVENUE") {
        search_results = orders.filter((item) =>
          item.price.toLowerCase().includes(event.target.value.toLowerCase())
        );
      }
      console.log("search_results :>> ", search_results);
      setOrders([...search_results]);
    } else {
      __handleChangePage(1);
    }
  };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setOrders(sliceData(all_orders, new_page, 5));
  };

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Order" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Orders List</h2>
          <div>
            <select
              className="selector-drop"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              name="cars"
              id="cars"
            >
              <option value="ID">ID</option>
              <option value="DATE">DATE</option>
              <option value="STATUS">STATUS</option>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="PRODUCT">PRODUCT</option>
              <option value="REVENUE">REVENUE</option>
            </select>

            <div className="dashboard-content-search">
              <input
                type="text"
                value={search}
                placeholder="Search.."
                className="dashboard-content-input"
                onChange={(e) => __handleSearch(e)}
              />
            </div>
          </div>
        </div>

        <table>
          <thead>
            <th>ID</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>COSTUMER</th>
            <th>PRODUCT</th>
            <th>REVENUE</th>
          </thead>

          {orders.length !== 0 ? (
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <span>{order.id}</span>
                  </td>
                  <td>
                    <span>{order.date}</span>
                  </td>
                  <td>
                    <div>
                      {order.status === "Paid" ? (
                        <img
                          src={DoneIcon}
                          alt="paid-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order.status === "Canceled" ? (
                        <img
                          src={CancelIcon}
                          alt="canceled-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order.status === "Refunded" ? (
                        <img
                          src={RefundedIcon}
                          alt="refunded-icon"
                          className="dashboard-content-icon"
                        />
                      ) : null}
                      <span>{order.status}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <img
                        src={order.avatar}
                        className="dashboard-content-avatar"
                        alt={order.first_name + " " + order.last_name}
                      />
                      <span>
                        {order.first_name} {order.last_name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span>{order.product}</span>
                  </td>
                  <td>
                    <span>${order.price}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>

        {orders.length !== 0 ? (
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
