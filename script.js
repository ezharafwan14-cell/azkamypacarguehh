/* =========================================
   BIRTHDAY WEBSITE — AZKA
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTS
    ====================================== */

    const opening = document.getElementById("opening");
    const startButton = document.getElementById("startButton");
    const mainContent = document.getElementById("mainContent");

    const menuSection = document.getElementById("menuSection");

    const contentSections = document.querySelectorAll(
        ".content-section"
    );

    const menuCards = document.querySelectorAll(
        ".menu-card"
    );

    const backButtons = document.querySelectorAll(
        ".back-button"
    );


    /* =====================================
       OPENING SCREEN
    ====================================== */

    let websiteStarted = false;

    startButton.addEventListener("click", () => {

        if (websiteStarted) {
            return;
        }

        websiteStarted = true;

        opening.classList.add("hide");

        setTimeout(() => {

            mainContent.classList.add("visible");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 500);

    });


    /* =====================================
       FLOATING PARTICLES
    ====================================== */

    const particlesContainer =
        document.getElementById("particles");

    function createParticles() {

        const amount =
            window.innerWidth < 600 ? 35 : 65;

        for (let i = 0; i < amount; i++) {

            const particle =
                document.createElement("span");

            particle.className = "particle";

            const size =
                Math.random() * 2 + 1;

            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.animationDuration =
                `${Math.random() * 15 + 10}s`;

            particle.style.animationDelay =
                `${Math.random() * 15}s`;

            particle.style.opacity =
                `${Math.random() * 0.5 + 0.2}`;

            particlesContainer.appendChild(
                particle
            );
        }
    }

    createParticles();


    /* =====================================
       MOUSE GLOW
    ====================================== */

    const mouseGlow =
        document.querySelector(".mouse-glow");

    const supportsHover =
        window.matchMedia(
            "(hover: hover)"
        ).matches;

    if (supportsHover) {

        document.addEventListener(
            "mousemove",
            (event) => {

                mouseGlow.style.left =
                    `${event.clientX}px`;

                mouseGlow.style.top =
                    `${event.clientY}px`;

                mouseGlow.style.opacity = "1";
            }
        );

        document.addEventListener(
            "mouseleave",
            () => {

                mouseGlow.style.opacity = "0";

            }
        );

    }


    /* =====================================
       REAL-TIME AGE COUNTER
    ====================================== */

    const birthDate =
        new Date(
            2010,
            8,
            3,
            0,
            0,
            0
        );

    const yearsElement =
        document.getElementById("years");

    const monthsElement =
        document.getElementById("months");

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    function getCalendarDifference(start, end) {

        let years =
            end.getFullYear() -
            start.getFullYear();

        let months =
            end.getMonth() -
            start.getMonth();

        let days =
            end.getDate() -
            start.getDate();

        let hours =
            end.getHours() -
            start.getHours();

        let minutes =
            end.getMinutes() -
            start.getMinutes();

        let seconds =
            end.getSeconds() -
            start.getSeconds();


        if (seconds < 0) {

            seconds += 60;
            minutes--;

        }


        if (minutes < 0) {

            minutes += 60;
            hours--;

        }


        if (hours < 0) {

            hours += 24;
            days--;

        }


        if (days < 0) {

            months--;

            const previousMonth =
                new Date(
                    end.getFullYear(),
                    end.getMonth(),
                    0
                );

            days +=
                previousMonth.getDate();

        }


        if (months < 0) {

            months += 12;
            years--;

        }


        return {
            years,
            months,
            days,
            hours,
            minutes,
            seconds
        };

    }


    function updateCounter() {

        const now =
            new Date();

        const difference =
            getCalendarDifference(
                birthDate,
                now
            );


        yearsElement.textContent =
            difference.years;

        monthsElement.textContent =
            difference.months;

        daysElement.textContent =
            difference.days;

        hoursElement.textContent =
            String(
                difference.hours
            ).padStart(2, "0");

        minutesElement.textContent =
            String(
                difference.minutes
            ).padStart(2, "0");

        secondsElement.textContent =
            String(
                difference.seconds
            ).padStart(2, "0");

    }


    updateCounter();

    setInterval(
        updateCounter,
        1000
    );


    /* =====================================
       SECTION NAVIGATION
    ====================================== */

    function closeAllSections() {

        contentSections.forEach(
            (section) => {

                section.classList.add(
                    "hidden-section"
                );

                section.classList.remove(
                    "entering"
                );

            }
        );

    }


    function showSection(sectionId) {

        const target =
            document.getElementById(
                sectionId
            );

        if (!target) {
            return;
        }


        closeAllSections();

        menuSection.style.display =
            "none";


        target.classList.remove(
            "hidden-section"
        );

        target.classList.add(
            "entering"
        );


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                target.classList.remove(
                    "entering"
                );

            });

        });


        setTimeout(() => {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 50);


        if (
            sectionId ===
            "endingSection"
        ) {

            resetEndingAnimation();

            setTimeout(() => {
                startEndingAnimation();
            }, 400);

        }

    }


    function showMenu() {

        closeAllSections();

        menuSection.style.display =
            "block";


        setTimeout(() => {

            menuSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 50);

    }


    menuCards.forEach(
        (card) => {

            card.addEventListener(
                "click",
                () => {

                    const target =
                        card.dataset.target;

                    showSection(target);

                }
            );

        }
    );


    backButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    showMenu();

                }
            );

        }
    );


    /* =====================================
       ESCAPE = KEMBALI KE MENU
    ====================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                const visibleSection =
                    [...contentSections]
                    .find(
                        (section) =>
                            !section.classList.contains(
                                "hidden-section"
                            )
                    );

                if (visibleSection) {

                    showMenu();

                }

            }

        }
    );


    /* =====================================
       10 LITTLE THINGS
       VERSI BAHASA INDONESIA
    ====================================== */

    const littleThings = [

        "Kamu pantas untuk dirayakan.",

        "Kamu jauh lebih istimewa daripada yang kamu sadari.",

        "Aku harap kamu tidak pernah lupa betapa berharganya dirimu.",

        "Kamu pantas dikelilingi orang-orang yang menghargaimu.",

        "Aku harap tahun ini membawamu semakin dekat dengan cita-citamu.",

        "Senyummu bisa membuat momen sederhana terasa lebih baik.",

        "Aku harap kamu terus menjadi seseorang yang ingin kamu banggakan.",

        "Masih banyak momen indah yang menunggumu di depan sana.",

        "Aku harap kamu selalu punya alasan untuk bangga pada dirimu sendiri.",

        "Dan yang paling penting, aku harap kamu bahagia. 💙"

    ];


    let currentThing = 0;


    const thingNumber =
        document.getElementById(
            "thingNumber"
        );

    const thingText =
        document.getElementById(
            "thingText"
        );

    const nextThingButton =
        document.getElementById(
            "nextThingButton"
        );


    nextThingButton.addEventListener(
        "click",
        () => {

            thingText.classList.add(
                "changing"
            );


            setTimeout(() => {

                currentThing++;


                if (
                    currentThing >=
                    littleThings.length
                ) {

                    currentThing = 0;

                }


                thingNumber.textContent =
                    `${String(currentThing + 1).padStart(2, "0")} / 10`;


                thingText.textContent =
                    littleThings[currentThing];


                thingText.classList.remove(
                    "changing"
                );

            }, 320);

        }
    );


    /* =====================================
       MUSIC PLAYER
    ====================================== */

    const audioPlayer =
        document.getElementById(
            "audioPlayer"
        );

    const musicStatus =
        document.getElementById(
            "musicStatus"
        );

    const songCards =
        document.querySelectorAll(
            ".song-card"
        );

    const playButtons =
        document.querySelectorAll(
            ".play-button"
        );


    const songs = {

        shape: {

            title: "Shape of My Heart",

            artist: "Backstreet Boys",

            src:
                "music/shape-of-my-heart.mp3"

        },

        lay: {

            title:
                "I Lay My Love on You",

            artist:
                "Westlife",

            src:
                "music/i-lay-my-love-on-you.mp3"

        }

    };


    let currentSong = null;


    function resetSongCards() {

        songCards.forEach(
            (card) => {

                card.classList.remove(
                    "playing"
                );

            }
        );


        playButtons.forEach(
            (button) => {

                button.textContent =
                    "▶";

            }
        );

    }


    function playSong(songId) {

        const song =
            songs[songId];

        if (!song) {
            return;
        }


        /*
         * Jika lagu yang sama sedang
         * diputar → pause.
         */

        if (
            currentSong === songId &&
            !audioPlayer.paused
        ) {

            audioPlayer.pause();

            resetSongCards();

            musicStatus.textContent =
                `Paused — ${song.title}`;

            return;

        }


        /*
         * Jika memilih lagu berbeda,
         * ganti source audio.
         */

        if (
            currentSong !== songId
        ) {

            audioPlayer.src =
                song.src;

            currentSong =
                songId;

        }


        audioPlayer.play()
            .then(() => {

                resetSongCards();


                const card =
                    document.querySelector(
                        `.song-card[data-song="${songId}"]`
                    );


                const button =
                    document.querySelector(
                        `.play-button[data-song="${songId}"]`
                    );


                if (card) {

                    card.classList.add(
                        "playing"
                    );

                }


                if (button) {

                    button.textContent =
                        "Ⅱ";

                }


                musicStatus.textContent =
                    `Now playing — ${song.title}`;

            })
            .catch(() => {

                resetSongCards();


                musicStatus.textContent =
                    `File musik belum ditemukan: ${song.src}`;

            });

    }


    playButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const songId =
                        button.dataset.song;

                    playSong(songId);

                }
            );

        }
    );


    /*
     * Ketika lagu selesai.
     */

    audioPlayer.addEventListener(
        "ended",
        () => {

            resetSongCards();

            musicStatus.textContent =
                "Song finished.";

            currentSong = null;

        }
    );


    /*
     * Ketika audio di-pause.
     */

    audioPlayer.addEventListener(
        "pause",
        () => {

            if (
                currentSong !== null
            ) {

                const song =
                    songs[currentSong];

                musicStatus.textContent =
                    `Paused — ${song.title}`;

            }

        }
    );


    /* =====================================
       SURPRISE / KEJUTAN
    ====================================== */

    const gift =
        document.getElementById(
            "gift"
        );

    const openGiftButton =
        document.getElementById(
            "openGiftButton"
        );

    const surpriseMessage =
        document.getElementById(
            "surpriseMessage"
        );

    const surpriseCard =
        document.getElementById(
            "surpriseCard"
        );


    let surpriseOpened = false;


    openGiftButton.addEventListener(
        "click",
        () => {

            if (surpriseOpened) {
                return;
            }


            surpriseOpened = true;


            /*
             * Hadiah bergoyang.
             */

            gift.classList.add(
                "shaking"
            );


            /*
             * Setelah bergoyang,
             * hadiah menghilang.
             */

            setTimeout(() => {

                gift.classList.add(
                    "hidden"
                );

            }, 600);


            /*
             * Kemudian pesan muncul.
             */

            setTimeout(() => {

                surpriseCard.classList.add(
                    "opened"
                );

                surpriseMessage.classList.add(
                    "show"
                );

            }, 900);

        }
    );


    /* =====================================
       ENDING ANIMATION
    ====================================== */

    const endingContent =
        document.getElementById(
            "endingContent"
        );

    const endingOne =
        document.getElementById(
            "endingOne"
        );

    const endingTwo =
        document.getElementById(
            "endingTwo"
        );

    const endingThree =
        document.getElementById(
            "endingThree"
        );

    const endingName =
        document.getElementById(
            "endingName"
        );

    const endingFinal =
        document.getElementById(
            "endingFinal"
        );


    let endingAnimationStarted =
        false;


    function startEndingAnimation() {

        if (
            endingAnimationStarted
        ) {
            return;
        }


        endingAnimationStarted =
            true;


        endingContent.classList.add(
            "animate"
        );


        /*
         * Kalimat pertama
         */

        setTimeout(() => {

            endingOne.classList.add(
                "visible"
            );

        }, 500);


        /*
         * Kalimat kedua
         */

        setTimeout(() => {

            endingTwo.classList.add(
                "visible"
            );

        }, 1900);


        /*
         * Kalimat ketiga
         */

        setTimeout(() => {

            endingThree.classList.add(
                "visible"
            );

        }, 3300);


        /*
         * Nama Azka
         */

        setTimeout(() => {

            endingName.classList.add(
                "visible"
            );

        }, 4800);


        /*
         * Tulisan terakhir
         */

        setTimeout(() => {

            endingFinal.classList.add(
                "visible"
            );

        }, 6500);

    }


    function resetEndingAnimation() {

        endingAnimationStarted =
            false;


        endingContent.classList.remove(
            "animate"
        );


        endingOne.classList.remove(
            "visible"
        );


        endingTwo.classList.remove(
            "visible"
        );


        endingThree.classList.remove(
            "visible"
        );


        endingName.classList.remove(
            "visible"
        );


        endingFinal.classList.remove(
            "visible"
        );

    }


    /* =====================================
       UPDATE COUNTER SAAT KEMBALI
    ====================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {
                return;
            }


            updateCounter();

        }
    );


    /* =====================================
       FINISH
    ====================================== */

});