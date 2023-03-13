import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInfos,
  selectFirstName,
  selectLastName,
} from "../../features/user/userSlice";
import { useUpdateUserMutation } from "../../features/user/userApiSlice";

function EditName(props) {
  const userRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const last_name = useSelector(selectLastName);
  const first_name = useSelector(selectFirstName);

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const closeEditCard = () => props.setIsEditing(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await updateUser({ firstName, lastName }).unwrap();
      dispatch(setUserInfos({ ...userData }));
      setFirstName("");
      setLastName("");
    } catch (err) {
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Invalid Fields");
      }
    }
    closeEditCard();
  };

  const handleFirstNameInput = (e) => setFirstName(e.target.value);

  const handleLastNameInput = (e) => setLastName(e.target.value);
  return (
    <main className="main bg-dark">
      {isLoading ? (
        <section className="loading">
          <h1 className="loading-msg">Loading</h1>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </section>
      ) : (
        <form onSubmit={handleSubmit}>
          <section className="edit-name-container">
            <div className="input-wrapper w45">
              <input
                type="text"
                id="firstName"
                ref={userRef}
                value={firstName}
                onChange={handleFirstNameInput}
                placeholder={first_name}
                autoComplete="off"
                required
              />
            </div>
            <div className="input-wrapper w45">
              <input
                type="text"
                id="lastName"
                onChange={handleLastNameInput}
                value={lastName}
                placeholder={last_name}
                autoComplete="off"
                required
              />
            </div>
          </section>
          <div className="edit-name-container">
            <button className="sign-in-button w45" type="submit">
              Save
            </button>
            <button
              className="sign-in-button w45"
              type="button"
              onClick={closeEditCard}
            >
              Cancel
            </button>
          </div>
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
        </form>
      )}
    </main>
  );
}

export default EditName;
