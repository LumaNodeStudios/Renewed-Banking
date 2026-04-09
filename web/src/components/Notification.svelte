<script>
    import { notify } from "../store/stores";
</script>

<section class="notificaion-container">
    <section class="notificaion-content">
        <i class="start-icon  fa fa-info-circle faa-shake animated fa-2x" />
        <strong class="font__weight-bold" style="font-size:0.69vw;">{$notify}</strong> 
    </section>
</section>

<style>
    .notificaion-container {
        width: auto;
        max-width: 400px;
        box-sizing: border-box;
        position: absolute;
        right: 2rem;
        top: 2rem;
        z-index: 10000;
    }
    .notificaion-content {
        background-color: var(--clr-primary-dark);
        color: var(--clr-text-bright);
        padding: 1.25rem 1.75rem;
        border-radius: 6px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        gap: 1.25rem;
        animation: slideIn 0.3s ease-out forwards;
    }
    .notificaion-content i {
        font-size: 1.25rem;
        color: var(--clr-green);
    }

</style>
