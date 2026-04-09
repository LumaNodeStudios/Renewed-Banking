<script lang="ts">
    import AccountsList from "./Accounts/AccountsList.svelte";
    import AccountTransactionsList from "./Accounts/AccountTransactionsList.svelte";
    import { accounts, bankName, bankSubtitle, translations } from "../store/stores";
    import { formatMoney } from "../utils/misc";
</script>

<div class="bank-wrapper">
    <header class="top-bar">
        <div class="brand">
            <div class="brand-icon">
                <i class="fa-solid fa-building-columns"></i>
            </div>
            <div class="brand-text">
                <h1>{$bankName}</h1>
                <span>{$bankSubtitle}</span>
            </div>
        </div>

        <div class="top-bar-title">
            <h2>{$translations.overview_title}</h2>
            <span>{$translations.overview_subtitle}</span>
        </div>

        <div class="header-stats">
            <div class="wallet-stat">
                <div class="stat-label">
                    <i class="fa-solid fa-wallet"></i>
                    <span>{$translations.cash_on_hand}</span>
                </div>
                <div class="stat-value">{formatMoney($accounts[0].cash)}</div>
            </div>
        </div>
    </header>

    <main class="main-content">
        <section class="dashboard-grid">
            <AccountsList />
            <AccountTransactionsList />
        </section>
    </main>
</div>

<style>
    .bank-wrapper {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1400px;
        height: 850px;
        background: var(--clr-primary-dark);
        border-radius: 24px;
        border: 1px solid var(--clr-border);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-family: var(--font-family);
        color: var(--clr-text);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .top-bar {
        padding: 1.5rem 3rem;
        background: var(--clr-primary);
        border-bottom: 1px solid var(--clr-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .brand-icon {
        width: 40px;
        height: 40px;
        background: var(--clr-green);
        color: var(--clr-accent-text);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
    }

    .brand-text h1 {
        font-size: 1.1rem;
        font-weight: 800;
        margin: 0;
        color: var(--clr-text-bright);
        letter-spacing: 0.5px;
    }

    .brand-text span {
        font-size: 0.7rem;
        color: var(--clr-text-muted);
        text-transform: uppercase;
    }

    .top-bar-title {
        text-align: center;
    }

    .top-bar-title h2 {
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--clr-text-bright);
        margin: 0;
    }

    .top-bar-title span {
        font-size: 0.85rem;
        color: var(--clr-text-muted);
    }

    .header-stats {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .wallet-stat {
        text-align: right;
    }

    .stat-label {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.5rem;
        color: var(--clr-text-muted);
        font-size: 0.75rem;
        margin-bottom: 0.25rem;
    }

    .stat-value {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--clr-green);
    }

    .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .dashboard-grid {
        flex: 1;
        display: flex;
        gap: 2rem;
        padding: 2.5rem 3rem;
        overflow: hidden;
    }
</style>
