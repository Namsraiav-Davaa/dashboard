import React, { useState, useEffect, useCallback, useContext } from "react";
import DashboardHeader from "../../components/DashboardHeader";

import all_orders from "../../constants/orders";
import { calculateRange, sliceData } from "../../utils/table-pagination";

import "../styles.css";
import { UserContext } from "../../userContext";

function Users() {
  const [search, setSearch] = useState("");
  const [lootBoxes, setLootBoxes] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [selected, setSelected] = useState("ID");
  const { user } = useContext(UserContext);

  const getResponse = useCallback(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
    };
    const response = await fetch(
      "https://dev.theherowarsguys.com/api/users",
      requestOptions
    );
    const data = await response.json();
    console.log("data :>> ", data);
    return data;
  }, [user.access]);

  useEffect(() => {
    getResponse().then((data) => {
      setPagination(calculateRange(data.user, data.perPage));
      setLootBoxes(sliceData(data.user, page, data.perPage));
    });
  }, [getResponse, page]);

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = [];
      if (selected === "ID") {
        search_results = lootBoxes.filter((item) =>
          item.id.toLowerCase().includes(event.target.value.toLowerCase())
        );
      } else if (selected === "DATE") {
        search_results = lootBoxes.filter((item) =>
          item.date.toLowerCase().includes(event.target.value.toLowerCase())
        );
      } else if (selected === "STATUS") {
        search_results = lootBoxes.filter((item) =>
          item.status.toLowerCase().includes(event.target.value.toLowerCase())
        );
      } else if (selected === "CUSTOMER") {
        console.log("ccccc");
        search_results = lootBoxes.filter(
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
        search_results = lootBoxes.filter((item) =>
          item.product.toLowerCase().includes(event.target.value.toLowerCase())
        );
      } else if (selected === "REVENUE") {
        search_results = lootBoxes.filter((item) =>
          item.price.toLowerCase().includes(event.target.value.toLowerCase())
        );
      }
      console.log("search_results :>> ", search_results);
      setLootBoxes([...search_results]);
    } else {
      __handleChangePage(1);
    }
  };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setLootBoxes(sliceData(all_orders, new_page, 5));
  };

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New User" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Users</h2>
          <div>
            {/* <select
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
            </div> */}
          </div>
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
          </thead>

          <thead>
            <th>
              <span>#</span>
            </th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={search}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => __handleSearch(e)}
                />
              </div>
            </th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={search}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => __handleSearch(e)}
                />
              </div>
            </th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={search}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => __handleSearch(e)}
                />
              </div>
            </th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={search}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => __handleSearch(e)}
                />
              </div>
            </th>
            <th>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={search}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => __handleSearch(e)}
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
