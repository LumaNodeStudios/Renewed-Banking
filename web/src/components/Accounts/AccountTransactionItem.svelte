<script lang="ts">
    export let transaction: any;
    import { formatMoney } from "../../utils/misc";
    import { translations } from "../../store/stores";
    function getTimeElapsed(seconds: number): string {
        let retData: string;
        const timestamp = Math.floor(Date.now() / 1000) - seconds;
        const minutes = Math.floor(timestamp / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (weeks !== 0 && weeks > 1) {
            retData = $translations.weeks.replace("%s", weeks);
        } else if (weeks !== 0 && weeks === 1) {
            retData = $translations.aweek;
        } else if (days !== 0 && days > 1) {
            retData = $translations.days.replace("%s", days);
        } else if (days !== 0 && days === 1) {
            retData = $translations.aday;
        } else if (hours !== 0 && hours > 1) {
            retData = $translations.hours.replace("%s", hours);
        } else if (hours !== 0 && hours === 1) {
            retData = $translations.ahour;
        } else if (minutes !== 0 && minutes > 1) {
            retData = $translations.mins.replace("%s", minutes);
        } else if (minutes !== 0 && minutes === 1) {
            retData = $translations.amin;
        } else {
            retData = $translations.secs;
        }
        return retData;
    }
</script>

<section
    class="transaction-row"
    class:is-withdraw={transaction.trans_type === "withdraw"}
    class:is-deposit={transaction.trans_type === "deposit"}
    class:is-transfer={transaction.trans_type === "transfer"}
>
    <div class="transaction-icon">
        {#if transaction.trans_type === "withdraw"}
            <i class="fa-solid fa-minus"></i>
        {:else if transaction.trans_type === "deposit"}
            <i class="fa-solid fa-plus"></i>
        {:else}
            <i class="fa-solid fa-paper-plane"></i>
        {/if}
    </div>

    <div class="transaction-details">
        <div class="detail-main">
            <strong>{transaction.title}</strong>
            <span>{transaction.receiver} • {transaction.trans_id}</span>
        </div>
        <div class="detail-meta">
            <span>{getTimeElapsed(transaction.time)}</span>
            <span>{transaction.issuer}</span>
        </div>
    </div>

    <div class="transaction-amount">
        <strong class:amount-withdraw={transaction.trans_type === "withdraw"}>
            {transaction.trans_type === "withdraw" ? "-" : "+"}{formatMoney(
                transaction.amount,
            )}
        </strong>
        <span class="message-preview">{transaction.message}</span>
    </div>
</section>

<style>
    .transaction-row {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background: var(--clr-primary-dark);
        border: 1px solid var(--clr-border);
        padding: 1.25rem 1.5rem;
        border-radius: 16px;
        transition: all 0.2s ease;
        position: relative;
    }

    .transaction-row:hover {
        background: var(--clr-primary-light);
        border-color: var(--clr-green);
    }

    .transaction-icon {
        width: 45px;
        height: 45px;
        background: rgba(74, 222, 128, 0.1);
        color: var(--clr-green);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        flex-shrink: 0;
    }

    .is-withdraw .transaction-icon {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
    }

    .is-deposit .transaction-icon {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
    }

    .is-transfer .transaction-icon {
        background: rgba(74, 222, 128, 0.1);
        color: var(--clr-green);
    }

    .transaction-details {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .detail-main {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .detail-main strong {
        font-size: 1rem;
        color: var(--clr-text-bright);
        font-weight: 600;
    }

    .detail-main span {
        font-size: 0.8rem;
        color: var(--clr-text-muted);
    }

    .detail-meta {
        text-align: right;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .detail-meta span:first-child {
        font-size: 0.85rem;
        color: var(--clr-text-bright);
    }

    .detail-meta span:last-child {
        font-size: 0.75rem;
        color: var(--clr-text-muted);
    }

    .transaction-amount {
        width: 151px;
        text-align: right;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .transaction-amount strong {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--clr-green);
    }

    .transaction-amount strong.amount-withdraw {
        color: #ef4444;
    }

    .message-preview {
        font-size: 0.75rem;
        color: var(--clr-text-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 150px;
    }
</style>
