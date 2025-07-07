import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Typography,
  Button,
} from "@mui/material";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserData(Array.isArray(parsed) ? parsed : [parsed]); //→ Ensures that userData is always an array, even if only one user object is saved.
        // (This avoids errors while looping with .map() later.)
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem("userData");
    setUserData([]);
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        👤 Registered User Details
      </Typography>

      {userData.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
          No data available
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Password</b></TableCell>
              <TableCell><b>Remember</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.rememberMe ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Button onClick={handleClear} variant="contained" color="error" fullWidth sx={{ mt: 2 }}>
        Clear Data
      </Button>
    </TableContainer>
  );
};

export default Dashboard;
