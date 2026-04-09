<script lang="ts">
    import { accounts, activeAccount, popupDetails, loading, translations } from "../store/stores";
    import {fetchNui} from "../utils/fetchNui"
    let amount: number = 0;
    let comment: string = "";
    let stateid: string = "";
    $: account = $accounts.find((accountItem: any) => $activeAccount === accountItem.id);

    function closePopup() {
        popupDetails.update((val: any) => ({
            ...val,
            actionType: ""
        }));
    }

    function submitInput() {
        loading.set(true);
        fetchNui($popupDetails.actionType, {fromAccount: $popupDetails.account.id, amount: amount, comment: comment, stateid: stateid}).then(retData => {
            setTimeout(() => {
                if (retData !== false){
                    accounts.set(retData);
                }
                loading.set(false);
            }, 1000);
        })
        closePopup();
    }
</script>

<section class="popup-container">
    <section class="popup-content">
        <header class="modal-header">
            <div class="modal-icon">
                {#if $popupDetails.actionType === "deposit"}
                    <i class="fa-solid fa-plus"></i>
                {:else if $popupDetails.actionType === "withdraw"}
                    <i class="fa-solid fa-minus"></i>
                {:else}
                    <i class="fa-solid fa-paper-plane"></i>
                {/if}
            </div>
            <div class="modal-title-group">
                <h2>{$translations[$popupDetails.actionType + "_but"] || $popupDetails.actionType}</h2>
                <span>{$popupDetails.account.type}{$translations.account} • #{$popupDetails.account.id}</span>
            </div>
        </header>

        <form on:submit|preventDefault={submitInput}>
            <div class="form-body">
                <div class="form-row">
                    <label for="amount">{$translations.amount}</label>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <input bind:value={amount} type="number" name="amount" id="amount" placeholder={$translations.amount_placeholder} required />
                    </div>
                </div>

                <div class="form-row">
                    <label for="comment">{$translations.comment}</label>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-comment-dots"></i>
                        <input bind:value={comment} type="text" name="comment" id="comment" placeholder={$translations.comment_placeholder} />
                    </div>
                </div>

                {#if $popupDetails.actionType === "transfer"}
                    <div class="form-row">
                        <label for="stateId">{$translations.transfer}</label>
                        <div class="input-wrapper">
                            <i class="fa-solid fa-id-card"></i>
                            <input bind:value={stateid} type="text" name="stateId" id="stateId" placeholder={$translations.transfer_placeholder} required />
                        </div>
                    </div>
                {/if}
            </div>

            <div class="modal-footer">
                <button type="button" class="footer-btn cancel" on:click={closePopup}>
                    {$translations.cancel}
                </button>
                <button type="submit" class="footer-btn confirm">
                    {$translations.confirm_but}
                </button>
            </div>
        </form>
    </section>
</section>

<style>
    .popup-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        pointer-events: auto;
    }

    .popup-content {
        max-width: 480px;
        width: 100%;
        background-color: var(--clr-primary);
        border-radius: 24px;
        border: 1px solid var(--clr-border);
        color: var(--clr-text);
        box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
        overflow: hidden;
    }

    .modal-header {
        padding: 2.5rem 2.5rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1.25rem;
    }

    .modal-icon {
        width: 50px;
        height: 50px;
        background: var(--clr-primary-light);
        color: var(--clr-green);
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        border: 1px solid var(--clr-border);
    }

    .modal-title-group h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--clr-text-bright);
        margin: 0;
        text-transform: capitalize;
    }

    .modal-title-group span {
        font-size: 0.85rem;
        color: var(--clr-text-muted);
    }

    .form-body {
        padding: 0 2.5rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .form-row {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .form-row label {
        font-size: 0.85rem;
        color: var(--clr-text-muted);
        font-weight: 600;
        margin-left: 0.2rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .input-wrapper {
        position: relative;
    }

    .input-wrapper i {
        position: absolute;
        left: 1.25rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--clr-text-muted);
        font-size: 1rem;
    }

    .input-wrapper input {
        width: 100%;
        background: var(--clr-primary-dark);
        border: 1px solid var(--clr-border);
        border-radius: 12px;
        padding: 1rem 1rem 1rem 3rem;
        color: var(--clr-text-bright);
        font-size: 1.1rem;
        transition: all 0.2s ease;
    }

    .input-wrapper input:focus {
        border-color: var(--clr-green);
        background: black;
    }

    .modal-footer {
        padding: 0 2.5rem 2.5rem;
        display: flex;
        gap: 1rem;
    }

    .footer-btn {
        flex: 1;
        padding: 1rem;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .footer-btn.cancel {
        background: var(--clr-primary-light);
        border: 1px solid var(--clr-border);
        color: var(--clr-text-bright);
    }

    .footer-btn.cancel:hover {
        background: #25262b;
        color: #ef4444;
        border-color: #ef4444;
    }


    .footer-btn.confirm {
        background: var(--clr-green);
        border: 1px solid var(--clr-green);
        color: var(--clr-accent-text);
    }

    .footer-btn.confirm:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }
</style>
