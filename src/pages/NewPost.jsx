import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewPostForm from "../components/NewPostForm";
import { savePost } from "../util/api";

const NewPostPage = () => {
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [error, setError] = useState();
      const navigate = useNavigate();

      const submitHandler = async (event) => {
            event.preventDefault();
            setIsSubmitting(true);
            try {
                  const formData = new FormData(event.target);
                  const post = {
                        title: formData.get("title"),
                        body: formData.get("post-text"),
                  };
                  await savePost(post);
                  navigate("/");
            } catch (err) {
                  setError(err);
            }
            setIsSubmitting(false);
      };

      const cancelHandler = () => {
            navigate("/blog");
      };

      return (
            <>
                  {error && <p>{error.message}</p>}
                  <NewPostForm
                        onCancel={cancelHandler}
                        onSubmit={submitHandler}
                        submitting={isSubmitting}
                  />
            </>
      );
};

export default NewPostPage;
