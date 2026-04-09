<script lang="ts">
    import { accounts, translations } from "../../store/stores";
    import AccountListItem from "./AccountListItem.svelte";
    let accSearch = "";
</script>

<section class="accounts-list-container">
    <div class="list-header">
        <h3 class="heading">{$translations.accounts}</h3>
        <div class="search-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" class="acc-search" placeholder={$translations.account_search} bind:value={accSearch} />
        </div>
    </div>
    
    <div class="scroller">
        {#if $accounts.filter(item => item.name.toLowerCase().includes(accSearch.toLowerCase())).length > 0}
            <div class="cards-grid">
                {#each $accounts.filter(item => item.name.toLowerCase().includes(accSearch.toLowerCase())) as account (account.id)}
                    <AccountListItem {account} />
                {/each}
            </div>
        {:else}
            <div class="empty-state">
                <i class="fa-solid fa-circle-exclamation"></i>
                <h3>{$translations.account_not_found}</h3>
            </div>
        {/if}
    </div>
</section>

<style>
    .accounts-list-container {
        flex: 0 0 380px;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .list-header {
        margin-bottom: 2rem;
    }

    .heading {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--clr-text-bright);
        margin-bottom: 1.25rem;
    }

    .search-box {
        position: relative;
        width: 100%;
    }

    .search-box i {
        position: absolute;
        left: 1.25rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--clr-text-muted);
        font-size: 0.9rem;
    }

    .acc-search {
        width: 100%;
        border-radius: 12px;
        border: 1px solid var(--clr-border);
        padding: 1rem 1rem 1rem 3rem;
        background-color: var(--clr-primary);
        color: var(--clr-text-bright);
        font-size: 0.95rem;
        transition: all 0.2s ease;
    }

    .acc-search:focus {
        border-color: var(--clr-green);
        background: var(--clr-primary-light);
    }

    .scroller {
        flex: 1;
        overflow-y: auto;
        padding-right: 0.5rem;
    }

    .cards-grid {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem 1rem;
        color: var(--clr-text-muted);
        text-align: center;
        background: var(--clr-primary);
        border-radius: 16px;
        border: 1px dashed var(--clr-border);
    }

    .empty-state i {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }

    .empty-state h3 {
        font-size: 1rem;
        font-weight: 500;
        margin: 0;
    }
</style>
