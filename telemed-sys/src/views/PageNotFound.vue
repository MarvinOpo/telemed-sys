<template>
    <q-card class="child-component" flat>
        <q-card-section>
            <div class="row column mt-10 text-grey">
                <q-img src="images/bg-404.png" class="q-ml-auto q-mr-auto" height="300px" width="500px"></q-img>

                <div class="q-mt-lg text-center fs-40">
                    PAGE NOT FOUND
                </div>

                <div class="text-center fs-20">
                    The page you are looking for doesn't exist. <br>
                    Please return to home page.
                </div>

                <div class="q-mt-lg self-center">
                    <q-btn color="blue lighten-2" href="/" dark rounded x-large>
                        <q-icon class="q-mr-sm" name="home" /> GO TO HOMEPAGE
                    </q-btn>
                </div>
            </div>
            <br>
        </q-card-section>
    </q-card>
</template>

<script>
export default {
    beforeMount() {
        this.$emit('error404', true);
    }
}
</script>