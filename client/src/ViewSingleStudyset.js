import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ViewSingleStudyset() {
  const { id } = useParams();

    const [studyset, setStudyset] = useState();
    useEffect(() => {
        fetch(`/my_studysets/${id}`)
        .then(r => r.json())
        .then(data => setStudyset(data))
    }, [id])

    if (!studyset) return null;

  return (
    <div>
          <h1>Now showing {studyset.title} studyset </h1>
          <h2>Description: {studyset.description}</h2>
    </div>
  );
}

export default ViewSingleStudyset;
