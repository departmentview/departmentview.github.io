function showJobs() {
    setTimeout(function () {
        $('.iphone').addClass('active')
        setTimeout(function () {
            if (document.documentElement.clientWidth >= 1024) {
                setTimeout(function () {
                    document.querySelector(".iphone__blur").style.opacity = 1;
                }, 2500)
            }

        }, 300);
    }, 100);

    setTimeout(function () {
        $('.quote').addClass('active')
    }, 500);
}