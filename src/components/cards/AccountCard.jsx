import { formatNumber } from "../../utils/formatNumber";

function AccountCard({ title, amount, description }) {
  return (
    <div className="account-container">
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">{title}</h3>
          <p className="account-amount">${formatNumber(amount)}</p>
          <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </div>
  );
}

export default AccountCard;
