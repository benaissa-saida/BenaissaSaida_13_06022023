import { formatNumber } from "../../utils/formatNumber";

function AccountCard({ name, balance, description }) {
  return (
    <div className="account-container">
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">{name}</h3>
          <p className="account-balance">${formatNumber(balance)}</p>
          <p className="account-balance-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </div>
  );
}

export default AccountCard;
