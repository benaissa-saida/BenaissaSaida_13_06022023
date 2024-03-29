import AccountCard from "../components/cards/AccountCard";
import { AccountData } from "../datas/accountData";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentName, setUserInfos } from "../features/user/userSlice";
import { useGetUserQuery } from "../features/user/userApiSlice";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import EditName from "../components/forms/EditName";

function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const openEditCard = () => setIsEditing(true);
  const { isFetching, data } = useGetUserQuery();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isFetching) {
      dispatch(setUserInfos({ ...data }));
    }
  }, [dispatch, isFetching, data]);

  const name = useSelector(selectCurrentName);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {isEditing ? "" : <span>{!isFetching ? name : ""}</span>}
        </h1>

        {isEditing ? (
          <EditName setIsEditing={setIsEditing} />
        ) : (
          <button className="edit-button" onClick={openEditCard}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>

      {AccountData.map(({ name, balance, description }, index) => (
        <AccountCard
          key={`account-${index}`}
          name={name}
          balance={balance}
          description={description}
        />
      ))}
    </main>
  );
}

export default Dashboard;
