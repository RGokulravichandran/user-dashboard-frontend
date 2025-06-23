import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  InputLabel,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { fetchUsers, updateUser, createUser, deleteUser } from "../api/users";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    console.log("Profile from localStorage:", profile);
    if (profile) {
      try {
        const parsedProfile = JSON.parse(profile);
        console.log("Parsed profile:", parsedProfile);
        const decodedToken = jwtDecode(parsedProfile.token);
        console.log("Decoded token:", decodedToken);
        setCurrentUser({ ...parsedProfile, role: decodedToken.role });
        console.log("Current user after setting role:", {
          ...parsedProfile,
          role: decodedToken.role,
        });
      } catch (e) {
        console.error("Error parsing profile from localStorage:", e);
      }
    }
  }, []);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newUser, setNewUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await fetchUsers();
        console.log("Fetched users data:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(error.response?.data?.message || "Error fetching users");
      }
    };
    getUsers();
  }, []);

  const handleEdit = (user) => {
    console.log("User object being edited:", user);
    setEditingId(user.id);
    setEditedUser({
      ...user,
      firstName: user.firstName || user.firstname || "",
      lastName: user.lastName || user.lastname || "",
    });
    setOpenDialog(true);
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const {
        id,
        createdAt,
        updatedAt,
        ...restOfEditedUser
      } = editedUser;
      const userToUpdate = { ...restOfEditedUser };

      if (userToUpdate.password === "") {
        delete userToUpdate.password;
      }
      await updateUser(id, userToUpdate);
      setUsers(users.map((user) => (user.id === id ? editedUser : user)));
      setEditingId(null);
      setEditedUser({});
      toast.success("User updated successfully!");
      setOpenDialog(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating user");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedUser({});
    setOpenDialog(false);
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedUser(null);
  };

  const handleOpenNewUserDialog = () => {
    setOpenNewUserDialog(true);
    setNewUser({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleCloseNewUserDialog = () => {
    setOpenNewUserDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      const { data } = await createUser(newUser);
      setUsers([...users, data]);
      setNewUser({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: "",
      });
      toast.success("User added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding user");
    }
  };

  if (!currentUser) {
    return <Typography>Loading user data...</Typography>;
  }

  // Check if currentUser has a role property
  if (!currentUser.role) {
    console.error(
      "Current user object is missing the role property:",
      currentUser
    );
    return (
      <Typography>Error: User role not found. Please log in again.</Typography>
    );
  }

  const userRole = currentUser.role ? currentUser.role.toLowerCase() : "";

  const canAddUser = userRole === "admin" || userRole === "super_admin";

  const canEditOrDelete = true;

  const canEditOwnProfile = (userId) => {
    return currentUser && currentUser.id === userId;
  };

  return (
    <Box sx={{ margin: 2 }}>
      {canAddUser && (
        <Box sx={{ marginBottom: 2 }}>
          <Button variant="contained" onClick={handleOpenNewUserDialog}>
            Create New User
          </Button>
        </Box>
      )}

      <Dialog open={openNewUserDialog} onClose={() => setOpenNewUserDialog(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                name="username"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
                value={newUser.username}
                onChange={handleNewUserChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="firstName"
                label="First Name"
                type="text"
                fullWidth
                variant="standard"
                value={newUser.firstName}
                onChange={handleNewUserChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
                value={newUser.lastName}
                onChange={handleNewUserChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                value={newUser.email}
                onChange={handleNewUserChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense" variant="standard">
                <InputLabel id="new-user-role-label">Role</InputLabel>
                <Select
                  labelId="new-user-role-label"
                  id="new-user-role"
                  name="role"
                  value={newUser.role}
                  label="Role"
                  onChange={handleNewUserChange}
                >
                  {userRole === "super_admin" && (
                    <MenuItem value="SUPER_ADMIN">SUPER_ADMIN</MenuItem>
                  )}
                  {(userRole === "super_admin" || userRole === "admin") && (
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                  )}
                  <MenuItem value="USER">USER</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={newUser.password}
                onChange={handleNewUserChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewUserDialog(false)}>Cancel</Button>
          <Button onClick={handleAddUser}>Add User</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', fontWeight: 'bold', textAlign: 'center' }}>ID</TableCell>
              <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', fontWeight: 'bold', textAlign: 'center' }}>Username</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', fontWeight: 'bold', textAlign: 'center' }}>First Name</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', fontWeight: 'bold', textAlign: 'center' }}>Last Name</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', fontWeight: 'bold', textAlign: 'center' }}>Role</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', wordBreak: 'break-word', padding: '10px', verticalAlign: 'top' }}>{user.id}</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', wordBreak: 'break-word', padding: '10px', verticalAlign: 'top' }}>{user.username}</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', wordBreak: 'break-word', padding: '10px', verticalAlign: 'top' }}>{user.firstName}</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', wordBreak: 'break-word', padding: '10px', verticalAlign: 'top' }}>{user.lastName}</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', wordBreak: 'break-word', padding: '10px', verticalAlign: 'top' }}>{user.email}</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', wordBreak: 'break-word', padding: '10px', verticalAlign: 'top' }}>{user.role}</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', wordBreak: 'break-word', padding: '10px', verticalAlign: 'top' }}>{user.status}</TableCell>
                <TableCell sx={{ border: '2px solid rgba(224, 224, 224, 1)', display: 'flex', gap: '2px', '& .MuiIconButton-root': { padding: '5px' } }}>
                  <Button
                    onClick={() => handleEdit(user)}
                    disabled={!canEditOrDelete && !canEditOwnProfile(user.id)}
                    sx={{ color: "primary.main" }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    disabled={!canEditOrDelete}
                    sx={{ color: "error.main" }}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleViewProfile(user)}
                  >
                    <VisibilityIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={editedUser.username || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={editedUser.firstName || ""}
            onChange={handleChange}
            InputProps={{
              readOnly: false,
            }}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={editedUser.password || ""}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={editedUser.lastName || ""}
            onChange={handleChange}
            InputProps={{
              readOnly: false,
            }}
          />
          <FormControl fullWidth margin="dense" variant="standard">
            <Select
              name="status"
              value={editedUser.status || ""}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={() => handleSave(editedUser.id)}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* View Profile Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Typography>
                <b>Username:</b> {selectedUser.username}
              </Typography>
              <Typography>
                <b>First Name:</b> {selectedUser.firstname}
              </Typography>
              <Typography>
                <b>Last Name:</b> {selectedUser.lastname}
              </Typography>
              <Typography>
                <b>Email:</b> {selectedUser.email}
              </Typography>
              <Typography>
                <b>Role:</b> {selectedUser.role}
              </Typography>
              <Typography>
                <b>Status:</b> {selectedUser.status}
              </Typography>
              <Typography>
                <b>Created At:</b>{" "}
                {new Date(selectedUser.createdAt).toLocaleString()}
              </Typography>
              <Typography>
                <b>Updated At:</b>{" "}
                {new Date(selectedUser.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;
