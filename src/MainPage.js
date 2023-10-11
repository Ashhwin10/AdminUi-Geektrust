import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBoxComponent from "./Components/SearchBox";
import { Checkbox, IconButton, Button, Box } from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import PaginationComponent from "./Components/Pagination";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ModalComponent from "./Components/Modal";

export default function AdminUiApp() {
  // State Variables
  const [userData, SetUserData] = useState([]); // The data stored from the fetching of api
  const [selectedUser, SetSelectedUser] = useState([]); // The Selected user from the CheckBox
  const [currentPageNo, SetCurrentPageNo] = useState(1); // state for the rendering of data pageNo
  const [checkAllUsers, SetCheckAllUsers] = useState(false); // State for the updating of Check all users
  const [showModal, SetShowModal] = useState(false); // State to show modal true or false
  const [searchUser, setSearchUSer] = useState(""); // State for Search function
  const usersPerPage = 10; // The Users per page should br shown

  // API call to fetch the users.
  const performApicall = async () => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    try {
      const response = await axios.get(url);
      SetUserData(response.data);
      // console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // UseEffect function for API call
  useEffect(() => {
    performApicall();
  }, []);

  // Function to select one single User
  const selectOneUser = (event) => {
    let newList = [...selectedUser];
    let userId = event.target.value;
    let checked = event.target.checked;

    if (!checked) {
      SetCheckAllUsers(false);
      newList.splice(selectedUser.indexOf(userId), 1);
    } else {
      newList = [...selectedUser, userId];
    }
    SetSelectedUser(newList);
  };

  // Function to select all users in the page User
  const SelectAllUser = (event) => {
    let checked = event.target.checked;
    let newList = [...selectedUser];
    if (!checked) {
      SetCheckAllUsers(false);
      newList = [];
    } else {
      newList = slicedData.map((user) => user.id);
      SetCheckAllUsers(true);
    }
    SetSelectedUser(newList);
  };

  // Function to delete all the selected users
  const deleteAllSelectedUser = () => {
    const selectedUsers = selectedUser;
    const userDataa = userData.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    SetCheckAllUsers(false);
    SetUserData(userDataa);
  };

  // Function to delete one only the selected users User
  const deleteSelectedUser = (id) => {
    const updatedData = userData.filter((user) => user.id !== id);
    SetUserData(updatedData);
  };

  // search input value
  const handleSearchInput = (event) => {
    setSearchUSer(event.target.value);
  };

  // function to update the edited user
  const updateUser = (user) => {
    SetSelectedUser(user);
    SetShowModal(true);
  };

  //pagination data

  const lastUserIndex = currentPageNo * usersPerPage; // index of the last user
  const firstUserIndex = lastUserIndex - usersPerPage; // index of the first user
  const usersList = userData.length; //total users length
  const totalPages = Math.round(usersList / usersPerPage); // Total pages required
  const slicedData = userData.slice(firstUserIndex, lastUserIndex); // sliced data of 10 users per page

  const paginate = (pageNum) => {
    SetCurrentPageNo(pageNum);
  };

  return (
    <div>
      {/* Calling the search box component */}
      <SearchBoxComponent onChange={handleSearchInput} />
      <table className="tableData">
        <thead>
          <tr>
            <Checkbox
              checked={checkAllUsers}
              onChange={SelectAllUser}
              inputProps={{ "aria-label": "controlled" }}
            />
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData
            .filter((
              user //filter to display the searched component
            ) => user.name.toLowerCase().includes(searchUser.toLowerCase()))
            .slice(firstUserIndex, lastUserIndex) // Slice the data to display 10 users per page
            .map((data) => (
              <tr
                key={data.id}
                className={
                  selectedUser.includes(data.id) ? "SelectedColor" : ""
                }
              >
                <td>
                  <Checkbox
                    value={data.id}
                    onChange={selectOneUser}
                    checked={selectedUser.includes(data.id)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
                <td>
                  <IconButton onClick={() => updateUser(data.id)}>
                    <EditNoteIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteSelectedUser(data.id)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Box sx={{ paddingTop: 5, mr: 1 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={deleteAllSelectedUser}
        >
          Delete Selected
        </Button>
      </Box>
      <Box>
        {/* Calling teh PAgination Component */}
        <PaginationComponent
          totalPages={totalPages}
          currentPageNo={currentPageNo}
          paginate={paginate}
        />
      </Box>

      <Box>
        {/* calling the Modal Component */}
        <ModalComponent
          usersData={userData}
          showModal={showModal}
          CloseModal={() => SetShowModal(false)}
          SetUserData={SetUserData}
          selectedUser={selectedUser}
        />
      </Box>
    </div>
  );
}
