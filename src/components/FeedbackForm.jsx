import { useContext, useEffect, useState } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import Rating from "./Rating";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisable] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(10);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisable(true);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const textHandler = (event) => {
    if (text === "") {
      setBtnDisable(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisable(true);
    } else {
      setMessage(null);
      setBtnDisable(false);
    }
    setText(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (text.trim().length >= 10) {
      const newFeedback = {
        rating,
        text,
      };
      if (feedbackEdit.edit) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      setText("");
    }
  };
  return (
    <Card>
      <form onSubmit={submitHandler}>
        <h2>How would you rate your servive with us?</h2>
        <Rating select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            onChange={textHandler}
            value={text}
          />
        </div>
        {message && <div className="message">{message}</div>}
        <Button type="submit" isDisabled={btnDisabled}>
          Send
        </Button>
      </form>
    </Card>
  );
}

export default FeedbackForm;
