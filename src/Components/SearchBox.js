import { TextField } from "@mui/material/";
import "./SearchBox.css";

export default function SearchBox({ onChange }) {
  return (
    <div className="search-box">
      <TextField
        fullWidth
        id="outlined-basic"
        label="Search By Name, Email or Role"
        variant="outlined"
        onChange={onChange}
      />
    </div>
  );
}
