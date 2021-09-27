import Box from "@mui/material/Box";
import ViewToggleFlashcard from "./ViewToggleFlashcard";

function ViewSingleFlashcard({ studyset, handleDelete, handleEdit}) {
  return (
    <Box component="span" sx={{ textAlign: "center" }} >
      {studyset.flashcards.map((flashcard) => (
        <ViewToggleFlashcard flashcard={flashcard} handleDelete={handleDelete} handleEdit={handleEdit} key={Math.random()}/>
      ))}
    </Box>
  );
}

export default ViewSingleFlashcard;
