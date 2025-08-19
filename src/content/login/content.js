(function() {
    function copyHiddenInputs() {
        const hiddenUser = document.querySelector("#username");
        const hiddenPass = document.querySelector("#password");
        const fakeUser = document.querySelector("input.fake-login");
        const fakePass = document.querySelector("input.fake-password");

        if (hiddenUser) {
            hiddenUser.style.display = ""; // usuń display:none
            if (fakeUser && hiddenUser.value && !fakeUser.value) {
                fakeUser.value = hiddenUser.value;
            }
        }

        if (hiddenPass) {
            hiddenPass.style.display = ""; // usuń display:none
            if (fakePass && hiddenPass.value && !fakePass.value) {
                fakePass.value = hiddenPass.value;
            }
        }
    }

    // uruchom od razu
    copyHiddenInputs();

    // ponów po załadowaniu i przy zmianach
    document.addEventListener("DOMContentLoaded", copyHiddenInputs);
    document.addEventListener("input", copyHiddenInputs);
})();
