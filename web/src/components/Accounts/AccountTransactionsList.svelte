<script lang="ts">
    import {
        accounts,
        activeAccount,
        translations,
        atm,
        notify,
    } from "../../store/stores";
    import AccountTransactionItem from "./AccountTransactionItem.svelte";
    import { convertToCSV } from "../../utils/convertToCSV";
    import { setClipboard } from "../../utils/setClipboad";
    let transSearch = "";
    $: account = $accounts.find(
        (accountItem: any) => $activeAccount === accountItem.id,
    );

    function handleClickExportData() {
        if (account == null) console.log("No account selected");
        if (account.transactions.length === 0) {
            notify.set("No transactions to export!");
            setTimeout(() => {
                notify.set("");
            }, 3500);
            return;
        }
        const csv = convertToCSV(account.transactions);
        setClipboard(csv);
        notify.set("Data copied to clipboard!");
        setTimeout(() => {
            notify.set("");
        }, 3500);
    }
    let isAtm: boolean = false;
    atm.subscribe((usingAtm: boolean) => {
        isAtm = usingAtm;
    });
</script>

<section class="transactions-container">
    <div class="transactions-header">
        <div class="section-title">
            <h3>{$translations.transactions}</h3>
            <span>{$translations.transaction_history}</span>
        </div>

        <div class="view-actions">
            <div class="search-input-wrapper">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                    type="text"
                    class="transactions-search"
                    placeholder={$translations.trans_search}
                    bind:value={transSearch}
                />
            </div>

            {#if !isAtm}
                <button
                    class="export-btn"
                    on:click|preventDefault={handleClickExportData}
                >
                    <i class="fa-solid fa-file-export"></i>
                    <span>{$translations.export_data}</span>
                </button>
            {/if}
        </div>
    </div>

    <div class="scroller">
        {#if account}
            {#if account.transactions.filter((item) => item.message
                        .toLowerCase()
                        .includes(transSearch.toLowerCase()) || item.trans_id
                        .toLowerCase()
                        .includes(transSearch.toLowerCase()) || item.receiver
                        .toLowerCase()
                        .includes(transSearch.toLowerCase())).length > 0}
                <div class="transactions-history">
                    {#each account.transactions.filter((item) => item.message
                                .toLowerCase()
                                .includes(transSearch.toLowerCase()) || item.trans_id
                                .toLowerCase()
                                .includes(transSearch.toLowerCase()) || item.receiver
                                .toLowerCase()
                                .includes(transSearch.toLowerCase())) as transaction (transaction.trans_id)}
                        <AccountTransactionItem {transaction} />
                    {/each}
                </div>
            {:else}
                <div class="empty-transactions">
                    <i class="fa-solid fa-receipt"></i>
                    <h3>{$translations.trans_not_found}</h3>
                </div>
            {/if}
        {:else}
            <div class="select-account-prompt">
                <i class="fa-solid fa-pointer"></i>
                <h3>{$translations.select_account}</h3>
            </div>
        {/if}
    </div>
</section>

<style>
    .transactions-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--clr-primary);
        border: 1px solid var(--clr-border);
        border-radius: 20px;
        padding: 1.5rem;
        position: relative;
    }

    .transactions-header {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .section-title h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--clr-text-bright);
        margin: 0;
    }

    .section-title span {
        font-size: 0.85rem;
        color: var(--clr-text-muted);
    }

    .view-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .search-input-wrapper {
        position: relative;
        flex: 1;
    }

    .search-input-wrapper i {
        position: absolute;
        left: 1.25rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--clr-text-muted);
        font-size: 0.9rem;
    }

    .transactions-search {
        width: 100%;
        border-radius: 12px;
        border: 1px solid var(--clr-border);
        padding: 0.85rem 1rem 0.85rem 3rem;
        background-color: var(--clr-primary-dark);
        color: var(--clr-text-bright);
        font-size: 0.95rem;
        transition: all 0.2s ease;
    }

    .transactions-search:focus {
        border-color: var(--clr-green);
        background: black;
    }

    .export-btn {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: var(--clr-primary-light);
        border: 1px solid var(--clr-border);
        color: var(--clr-text-bright);
        padding: 0.85rem 1.25rem;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .export-btn:hover {
        border-color: var(--clr-green);
        color: var(--clr-green);
    }

    .scroller {
        flex: 1;
        overflow-y: auto;
        padding-right: 0.5rem;
    }

    .transactions-history {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .empty-transactions,
    .select-account-prompt {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5rem 2rem;
        color: var(--clr-text-muted);
        text-align: center;
    }

    .empty-transactions i,
    .select-account-prompt i {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.3;
    }
</style>
