import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationComponent({
  totalPages,
  currentPageNo,
  paginate
}) {
  const handleChange = (event, value) => {
    // Call the paginate function to change the current page
    paginate(value);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      sx={{ paddingTop: 5 }}
    >
      <Pagination
        count={totalPages}
        page={currentPageNo}
        onChange={handleChange}
        variant="outlined"
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
