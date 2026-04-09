<script lang="ts">
    import {
        accounts,
        activeAccount,
        popupDetails,
        atm,
        translations,
    } from "../../store/stores";
    import { formatMoney } from "../../utils/misc";
    export let account: any;

    function handleAccountClick(id: any) {
        activeAccount.update(() => id);
    }

    let isAtm: boolean;
    function handleButton(id: string, type: string) {
        let account = $accounts.find(
            (accountItem: any) => id === accountItem.id,
        );
        popupDetails.update(() => ({ actionType: type, account }));
    }

    atm.subscribe((usingAtm: boolean) => {
        isAtm = usingAtm;
    });
</script>

<section
    class="account-card"
    class:active={$activeAccount === account.id}
    on:click={() => handleAccountClick(account.id)}
    on:keydown={() => {}}
>
    <div class="card-header">
        <div class="type-badge">
            <i class="fa-solid fa-credit-card"></i>
            <span>{$translations[account.type.toLowerCase() + "_account"] || (account.type + $translations.account)}</span>
        </div>
        <span class="account-number">#{account.id}</span>
    </div>

    <div class="card-body">
        <div class="account-name">
            <span>{$translations.account_holder}</span>
            <strong>{account.name}</strong>
        </div>
        <div class="account-balance">
            <strong>{formatMoney(account.amount)}</strong>
            <span>{$translations.balance}</span>
        </div>
    </div>

    {#if !account.isFrozen}
        <div class="card-actions">
            {#if !isAtm}
                <button
                    class="action-btn deposit"
                    on:click|stopPropagation={() =>
                        handleButton(account.id, "deposit")}
                >
                    <i class="fa-solid fa-plus"></i>
                    <span>{$translations.deposit_but}</span>
                </button>
            {/if}
            <button
                class="action-btn withdraw"
                on:click|stopPropagation={() =>
                    handleButton(account.id, "withdraw")}
            >
                <i class="fa-solid fa-minus"></i>
                <span>{$translations.withdraw_but}</span>
            </button>
            <button
                class="action-btn transfer"
                on:click|stopPropagation={() =>
                    handleButton(account.id, "transfer")}
            >
                <i class="fa-solid fa-paper-plane"></i>
                <span>{$translations.transfer_but}</span>
            </button>
        </div>
    {:else}
        <div class="frozen-badge">
            <i class="fa-solid fa-snowflake"></i>
            <span>{$translations.frozen}</span>
        </div>
    {/if}
</section>

<style>
    .account-card {
        background-color: var(--clr-primary);
        padding: 1.5rem;
        border-radius: 20px;
        cursor: pointer;
        border: 1px solid var(--clr-border);
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .account-card:hover {
        border-color: var(--clr-green);
        background: var(--clr-primary-light);
    }

    .account-card.active {
        background: var(--clr-primary-light);
        border-color: var(--clr-green);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .type-badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--clr-text-muted);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .type-badge i {
        color: var(--clr-green);
    }

    .account-number {
        font-size: 0.8rem;
        color: var(--clr-text-muted);
        font-family: monospace;
    }

    .card-body {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .account-name {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .account-name span {
        font-size: 0.7rem;
        color: var(--clr-text-muted);
        text-transform: uppercase;
    }

    .account-name strong {
        font-size: 1.1rem;
        color: var(--clr-text-bright);
        font-weight: 600;
    }

    .account-balance {
        text-align: right;
        display: flex;
        flex-direction: column;
    }

    .account-balance strong {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--clr-green);
    }

    .account-balance span {
        font-size: 0.7rem;
        color: var(--clr-text-muted);
        text-transform: uppercase;
    }

    .card-actions {
        display: flex;
        gap: 0.5rem;
        padding-top: 1rem;
        border-top: 1px solid var(--clr-border);
    }

    .action-btn {
        flex: 1;
        background: var(--clr-primary);
        border: 1px solid var(--clr-border);
        color: var(--clr-text);
        padding: 0.6rem 0.4rem;
        border-radius: 10px;
        font-size: 0.7rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        transition: all 0.2s ease;
    }

    .action-btn i {
        font-size: 0.9rem;
    }

    .action-btn:hover {
        background: var(--clr-primary-light);
        border-color: var(--clr-green);
        color: var(--clr-green);
    }

    .frozen-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        background: rgba(34, 197, 94, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        color: #4ade80;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.8rem;
    }
</style>
