/* =========================================================
   MIDNIGHT BLOOM
   SCRIPT.JS
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const openingScreen =
    document.getElementById("openingScreen");

const mainWebsite =
    document.getElementById("mainWebsite");

const startButton =
    document.getElementById("startButton");

const menuSection =
    document.getElementById("menuSection");

const menuCards =
    document.querySelectorAll(".menu-card");

const contentSections =
    document.querySelectorAll(".content-section");

const backButtons =
    document.querySelectorAll(".back-button");

const mouseGlow =
    document.getElementById("mouseGlow");

const particlesContainer =
    document.getElementById("particles");


/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

    if (!particlesContainer) {
        return;
    }

    const particleCount =
        window.innerWidth < 600
            ? 35
            : 65;

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");

        particle.className = "particle";

        const size =
            Math.random() * 2 + 1;

        const left =
            Math.random() * 100;

        const duration =
            Math.random() * 18 + 12;

        const delay =
            Math.random() * -20;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        particle.style.left =
            `${left}%`;

        particle.style.animationDuration =
            `${duration}s`;

        particle.style.animationDelay =
            `${delay}s`;

        particle.style.opacity =
            `${Math.random() * 0.6 + 0.2}`;

        particlesContainer.appendChild(
            particle
        );
    }
}

createParticles();


/* =========================================================
   MOUSE GLOW
========================================================= */

if (window.matchMedia("(pointer: fine)").matches) {

    document.addEventListener(
        "mousemove",
        (event) => {

            mouseGlow.style.left =
                `${event.clientX}px`;

            mouseGlow.style.top =
                `${event.clientY}px`;

            mouseGlow.style.opacity =
                "1";

        }
    );

    document.addEventListener(
        "mouseleave",
        () => {

            mouseGlow.style.opacity =
                "0";

        }
    );
}


/* =========================================================
   OPENING SCREEN
========================================================= */

let websiteStarted = false;

startButton.addEventListener(
    "click",
    () => {

        if (websiteStarted) {
            return;
        }

        websiteStarted = true;

        openingScreen.classList.add("hide");

        setTimeout(
            () => {

                mainWebsite.classList.remove(
                    "hidden"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });

            },
            700
        );

    }
);


/* =========================================================
   NAVIGATION
========================================================= */

function hideAllSections() {

    contentSections.forEach(
        (section) => {

            section.classList.remove(
                "active"
            );

        }
    );
}

function showMenu() {

    hideAllSections();

    menuSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

function showSection(sectionId) {

    hideAllSections();

    const section =
        document.getElementById(sectionId);

    if (!section) {
        return;
    }

    section.classList.add("active");

    setTimeout(
        () => {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        30
    );

    if (sectionId === "endingSection") {
        startEndingAnimation();
    }

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


/* =========================================================
   ESCAPE TO MENU
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }

        const activeSection =
            document.querySelector(
                ".content-section.active"
            );

        if (activeSection) {
            showMenu();
        }

    }
);


/* =========================================================
   REAL-TIME COUNTER
========================================================= */

const startDate =
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


function daysInMonth(
    year,
    month
) {

    return new Date(
        year,
        month + 1,
        0
    ).getDate();

}


function calculateAge(
    start,
    now
) {

    let years =
        now.getFullYear() -
        start.getFullYear();

    let months =
        now.getMonth() -
        start.getMonth();

    let days =
        now.getDate() -
        start.getDate();

    let hours =
        now.getHours() -
        start.getHours();

    let minutes =
        now.getMinutes() -
        start.getMinutes();

    let seconds =
        now.getSeconds() -
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

        const previousMonth =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            );

        days +=
            previousMonth.getDate();

        months--;

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

    if (now < startDate) {

        yearsElement.textContent = "0";
        monthsElement.textContent = "0";
        daysElement.textContent = "0";
        hoursElement.textContent = "0";
        minutesElement.textContent = "0";
        secondsElement.textContent = "0";

        return;
    }

    const result =
        calculateAge(
            startDate,
            now
        );

    yearsElement.textContent =
        result.years;

    monthsElement.textContent =
        result.months;

    daysElement.textContent =
        result.days;

    hoursElement.textContent =
        String(result.hours).padStart(
            2,
            "0"
        );

    minutesElement.textContent =
        String(result.minutes).padStart(
            2,
            "0"
        );

    secondsElement.textContent =
        String(result.seconds).padStart(
            2,
            "0"
        );
}

updateCounter();

setInterval(
    updateCounter,
    1000
);


/* =========================================================
   10 HAL KECIL
========================================================= */

const littleThings = [

    "Kamu pantas untuk dirayakan.",

    "Kamu lebih spesial daripada yang mungkin kamu sadari.",

    "Semoga kamu tidak pernah lupa betapa berharganya dirimu.",

    "Kamu pantas dikelilingi orang-orang yang menghargaimu.",

    "Semoga tahun ini membawamu semakin dekat dengan impianmu.",

    "Senyummu bisa membuat momen biasa terasa sedikit lebih baik.",

    "Semoga kamu terus menjadi seseorang yang ingin kamu banggakan.",

    "Masih banyak momen indah yang sedang menunggumu.",

    "Semoga kamu selalu punya alasan untuk bangga pada dirimu sendiri.",

    "Dan yang paling penting, semoga kamu bahagia. 💙"

];

let littleIndex = 0;

const littleNumber =
    document.getElementById(
        "littleNumber"
    );

const littleText =
    document.getElementById(
        "littleText"
    );

const nextLittleThing =
    document.getElementById(
        "nextLittleThing"
    );


function showLittleThing() {

    littleText.classList.add(
        "changing"
    );

    setTimeout(
        () => {

            littleText.textContent =
                littleThings[littleIndex];

            littleNumber.textContent =
                String(
                    littleIndex + 1
                ).padStart(
                    2,
                    "0"
                );

            littleText.classList.remove(
                "changing"
            );

        },
        400
    );
}

nextLittleThing.addEventListener(
    "click",
    () => {

        littleIndex++;

        if (
            littleIndex >=
            littleThings.length
        ) {
            littleIndex = 0;
        }

        showLittleThing();

    }
);


/* =========================================================
   MUSIC PLAYER
========================================================= */

const audioPlayer =
    document.getElementById(
        "audioPlayer"
    );

const musicCards =
    document.querySelectorAll(
        ".music-card"
    );

const songs = [

    {
        title:
            "Shape of My Heart",

        artist:
            "Backstreet Boys",

        src:
            "music/shape-of-my-heart.mp3"
    },

    {
        title:
            "I Lay My Love on You",

        artist:
            "Westlife",

        src:
            "music/i-lay-my-love-on-you.mp3"
    }

];

let currentSong =
    -1;


function updateMusicCards() {

    musicCards.forEach(
        (card, index) => {

            const button =
                card.querySelector(
                    ".play-button"
                );

            if (
                index === currentSong &&
                !audioPlayer.paused
            ) {

                card.classList.add(
                    "playing"
                );

                button.textContent =
                    "Ⅱ";

            } else {

                card.classList.remove(
                    "playing"
                );

                button.textContent =
                    "▶";

            }

        }
    );

}


function playSong(index) {

    if (
        currentSong === index &&
        !audioPlayer.paused
    ) {

        audioPlayer.pause();

        updateMusicCards();

        return;
    }

    currentSong = index;

    audioPlayer.src =
        songs[index].src;

    audioPlayer.load();

    audioPlayer.play()
        .then(
            () => {

                updateMusicCards();

            }
        )
        .catch(
            () => {

                updateMusicCards();

                console.warn(
                    "Musik belum bisa diputar. Pastikan file ada di folder music/."
                );

            }
        );

}


musicCards.forEach(
    (card, index) => {

        const button =
            card.querySelector(
                ".play-button"
            );

        button.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                playSong(index);

            }
        );

    }
);


audioPlayer.addEventListener(
    "play",
    updateMusicCards
);

audioPlayer.addEventListener(
    "pause",
    updateMusicCards
);

audioPlayer.addEventListener(
    "ended",
    () => {

        musicCards.forEach(
            (card) => {

                card.classList.remove(
                    "playing"
                );

            }
        );

        currentSong = -1;

        updateMusicCards();

    }
);


/* =========================================================
   SURPRISE — BLUE WHITE FLOWERS
========================================================= */

const openGift =
    document.getElementById(
        "openGift"
    );

const gift =
    document.getElementById(
        "gift"
    );

const flowerContainer =
    document.getElementById(
        "flowerContainer"
    );

const surpriseMessage =
    document.getElementById(
        "surpriseMessage"
    );


function createFlower(
    x,
    y,
    scale,
    delay,
    angle
) {

    const flower =
        document.createElement(
            "div"
        );

    flower.className =
        "flower";

    flower.style.setProperty(
        "--x",
        `${x}px`
    );

    flower.style.setProperty(
        "--y",
        `${y}px`
    );

    flower.style.setProperty(
        "--scale",
        scale
    );

    flower.style.setProperty(
        "--delay",
        `${delay}s`
    );

    flower.style.setProperty(
        "--angle",
        `${angle}deg`
    );


    const stem =
        document.createElement(
            "div"
        );

    stem.className =
        "flower-stem";

    stem.style.setProperty(
        "--stem-rotation",
        `${angle / 3}deg`
    );


    flower.appendChild(
        stem
    );


    const petalCount = 6;

    for (
        let i = 0;
        i < petalCount;
        i++
    ) {

        const petal =
            document.createElement(
                "div"
            );

        petal.className =
            "flower-petal";

        petal.style.setProperty(
            "--rotation",
            `${i * 60}deg`
        );

        flower.appendChild(
            petal
        );

    }


    const center =
        document.createElement(
            "div"
        );

    center.className =
        "flower-center";

    flower.appendChild(
        center
    );


    flowerContainer.appendChild(
        flower
    );

}


function createFlowerExplosion() {

    flowerContainer.innerHTML =
        "";

    const flowerCount =
        window.innerWidth < 600
            ? 34
            : 50;


    for (
        let i = 0;
        i < flowerCount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            Math.random() *
            360 +
            80;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;

        const scale =
            Math.random() *
            0.6 +
            0.45;

        const delay =
            Math.random() *
            1.1;

        const rotation =
            Math.random() *
            360 -
            180;

        createFlower(
            x,
            y,
            scale,
            delay,
            rotation
        );

    }


    /* Extra small flowers around screen */

    setTimeout(
        () => {

            const extraCount =
                window.innerWidth < 600
                    ? 15
                    : 25;

            for (
                let i = 0;
                i < extraCount;
                i++
            ) {

                const x =
                    Math.random() *
                    window.innerWidth -
                    window.innerWidth / 2;

                const y =
                    Math.random() *
                    window.innerHeight -
                    window.innerHeight / 2;

                const scale =
                    Math.random() *
                    0.35 +
                    0.25;

                createFlower(
                    x,
                    y,
                    scale,
                    Math.random(),
                    Math.random() * 360
                );

            }

        },
        700
    );

}


let surpriseOpened =
    false;


openGift.addEventListener(
    "click",
    () => {

        if (surpriseOpened) {
            return;
        }

        surpriseOpened = true;

        gift.classList.add(
            "opening"
        );

        setTimeout(
            () => {

                gift.classList.add(
                    "hide"
                );

                openGift.classList.add(
                    "hide"
                );

                createFlowerExplosion();

            },
            750
        );

        setTimeout(
            () => {

                surpriseMessage.classList.remove(
                    "hidden"
                );

            },
            1600
        );

    }
);


/* =========================================================
   ENDING ANIMATION
========================================================= */

let endingAnimationPlayed =
    false;


function startEndingAnimation() {

    if (endingAnimationPlayed) {
        return;
    }

    endingAnimationPlayed = true;


    const line1 =
        document.getElementById(
            "endingLine1"
        );

    const line2 =
        document.getElementById(
            "endingLine2"
        );

    const line3 =
        document.getElementById(
            "endingLine3"
        );

    const name =
        document.getElementById(
            "endingName"
        );

    const final =
        document.getElementById(
            "endingFinal"
        );


    setTimeout(
        () => {
            line1.classList.add(
                "show"
            );
        },
        400
    );


    setTimeout(
        () => {
            line2.classList.add(
                "show"
            );
        },
        1700
    );


    setTimeout(
        () => {
            line3.classList.add(
                "show"
            );
        },
        3100
    );


    setTimeout(
        () => {
            name.classList.add(
                "show"
            );
        },
        4600
    );


    setTimeout(
        () => {
            final.classList.add(
                "show"
            );
        },
        5900
    );

}


/* =========================================================
   QUIZ DATA
========================================================= */

const quizData = [

    {
        question:
            "Siapa dari kita yang suka duluan?",

        options: [

            {
                text:
                    "Aku",

                response:
                    "Tuh kan, emang kamu duluan yang suka. Sudah kuduga. 😌❤️"
            },

            {
                text:
                    "Kamu",

                response:
                    "Masak sih aku duluan?? Bukannya kamu? Coba deh diingat-ingat lagi. 😭"
            }

        ]

    },


    {
        question:
            "Siapa yang coba mendekat duluan?",

        options: [

            {
                text:
                    "Kamu",

                response:
                    "Masak sih, aku mendekat. Nggak ada deh kayaknya. 😭"
            },

            {
                text:
                    "Aku",

                response:
                    "Masak sih? Kok aku nggak nyadar? 👀"
            },

            {
                text:
                    "Nggak ada, sama-sama gengsi",

                response:
                    "Tuh kan, padahal sama-sama ada rasa, loh. Entah kenapa waktu itu nggak ada yang berani mendekat duluan. Sama-sama gengsi ternyata. 😭❤️"
            }

        ]

    },


    {
        question:
            "Siapa yang punya ide duluan buat mengungkapkan perasaannya?",

        options: [

            {
                text:
                    "Aku",

                response:
                    "Berani banget sih kamu, asliii. 😭❤️ Untung waktu itu ada yang akhirnya berani mulai."
            },

            {
                text:
                    "Kamu",

                response:
                    "Bukannya kamu yang bilang duluan? 👀 Jangan-jangan sekarang mulai lupa sama ceritanya sendiri."
            }

        ]

    },


    {
        question:
            "Apa yang paling kamu harapkan dari aku di umurmu yang baru?",

        options: [

            {
                text:
                    "Lebih perhatian",

                response:
                    "Hehe, aku catat. Semoga aku bisa lebih peka dan lebih perhatian sama kamu, bukan cuma saat kamu memintanya. ❤️"
            },

            {
                text:
                    "Lebih bisa buat aku ngerasa ditemenin",

                response:
                    "Semoga ke depannya aku bisa jadi seseorang yang bikin kamu merasa ditemani, bahkan di hari-hari yang nggak selalu mudah. 💙"
            },

            {
                text:
                    "Bisa jadi tempat cerita",

                response:
                    "Kalau kamu butuh tempat buat cerita, semoga aku bisa jadi salah satu tempat yang selalu terasa nyaman buat kamu. Cerita apa pun, kapan pun. ❤️"
            },

            {
                text:
                    "Semuanya ❤️",

                response:
                    "Waduh, semuanya diminta. 😭❤️ Tapi justru itu yang ingin aku usahakan. Semoga aku bisa lebih perhatian, lebih hadir, dan bisa jadi tempat kamu cerita tanpa harus merasa sendirian."
            }

        ]

    },


    {
        question:
            "Di ulang tahunmu berikutnya, kamu berharap...",

        options: [

            {
                text:
                    "Masih bisa merayakannya dengan orang-orang tersayang",

                response:
                    "Semoga tahun depan kamu masih dikelilingi orang-orang yang sayang sama kamu, dan ulang tahunmu kembali dipenuhi hal-hal sederhana yang bikin kamu bahagia. ❤️"
            },

            {
                text:
                    "Banyak hal baik terjadi",

                response:
                    "Aamiin. Semoga sebelum ulang tahunmu berikutnya, banyak hal baik datang ke hidupmu dan banyak hal yang kamu harapkan perlahan jadi nyata. 💙"
            },

            {
                text:
                    "Kita punya lebih banyak cerita",

                response:
                    "Aku juga berharap begitu. Semoga dari sekarang sampai ulang tahunmu berikutnya, kita punya banyak cerita baru yang suatu hari nanti bisa kita ingat sambil tersenyum. ❤️"
            },

            {
                text:
                    "Semua itu ❤️",

                response:
                    "Semoga setelah ini kita punya lebih banyak hal baik untuk disyukuri dan lebih banyak cerita baru untuk dikenang. Mungkin sekarang aku masih sering gengsi dan kadang nggak tahu harus mulai dari mana... tapi semoga ke depannya aku bisa lebih berani, lebih terbuka, dan nggak terlalu gengsi lagi. Siapa tahu, ulang tahunmu berikutnya kita sudah punya cerita yang jauh lebih banyak dari hari ini. ❤️"
            }

        ]

    },


    {
        question:
            "Kalau boleh memilih satu hal untuk kita lakukan sebelum ulang tahunmu berikutnya...",

        options: [

            {
                text:
                    "Pergi ke suatu tempat",

                response:
                    "Boleh banget. Semoga sebelum ulang tahunmu berikutnya kita bisa menemukan satu tempat yang nantinya punya cerita tersendiri buat kita. 🌙"
            },

            {
                text:
                    "Membuat banyak kenangan",

                response:
                    "Semoga kita punya banyak kesempatan untuk membuat kenangan baru. Nggak harus sesuatu yang besar, yang penting nanti ada banyak hal kecil yang bisa kita ingat. ❤️"
            },

            {
                text:
                    "Foto bersama",

                response:
                    "Nah, ini juga salah satu yang aku tunggu. 😭 Semoga sebelum ulang tahunmu berikutnya, halaman foto kita sudah punya satu foto yang benar-benar kita punya bersama."
            },

            {
                text:
                    "Semuanya kalau bisa 😭❤️",

                response:
                    "Nah ini baru jawaban yang benar. 😭❤️ Kalau bisa semuanya, kenapa harus pilih satu? Semoga sebelum ulang tahunmu berikutnya kita bisa pergi bersama, punya banyak cerita, dan akhirnya punya foto berdua yang bisa kita simpan sebagai bagian dari perjalanan kita."
            }

        ]

    },


    {
        question:
            "Pertanyaan terakhir: di umurmu yang baru, kamu masih mau aku ada di sampingmu?",

        options: [

            {
                text:
                    "Iya ❤️",

                response:
                    "Hehe... aku senang dengarnya. Semoga aku juga masih bisa jadi seseorang yang menemani banyak cerita di umurmu yang baru. ❤️"
            },

            {
                text:
                    "Jelas iya",

                response:
                    "Jawabannya tegas banget. 😭❤️ Kalau begitu, semoga kita sama-sama menjaga apa yang sudah kita mulai."
            },

            {
                text:
                    "Selama kamu nggak pergi",

                response:
                    "Aku nggak bisa menjanjikan semuanya akan selalu sempurna, tapi aku bisa berusaha untuk tetap ada dan menjaga apa yang berarti buat kita. ❤️"
            },

            {
                text:
                    "IYA, NGGAK USAH NANYA 😭❤️",

                response:
                    "OKEEE, NGGAK NANYA LAGI 😭❤️ Kalau begitu, semoga di umurmu yang baru ini kita masih bisa saling menemani, saling cerita, saling belajar, dan tentunya punya jauh lebih banyak cerita untuk ditulis di halaman berikutnya. Mungkin sekarang kita masih sama-sama gengsi, kadang bingung siapa yang harus mulai duluan... tapi semoga nanti kita bisa lebih berani menunjukkan apa yang sebenarnya kita rasakan. Untuk sekarang, satu hal yang aku tahu: aku senang pernah menjadi bagian dari cerita kamu. 💙"
            }

        ]

    }

];


/* =========================================================
   QUIZ ELEMENTS
========================================================= */

const quizNumber =
    document.getElementById(
        "quizNumber"
    );

const quizProgress =
    document.getElementById(
        "quizProgress"
    );

const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );

const quizOptions =
    document.getElementById(
        "quizOptions"
    );

const quizResponse =
    document.getElementById(
        "quizResponse"
    );

const responseText =
    document.getElementById(
        "responseText"
    );

const nextQuestion =
    document.getElementById(
        "nextQuestion"
    );

const quizComplete =
    document.getElementById(
        "quizComplete"
    );

const quizQuestionArea =
    document.getElementById(
        "quizQuestionArea"
    );

const restartQuiz =
    document.getElementById(
        "restartQuiz"
    );

const finishQuiz =
    document.getElementById(
        "finishQuiz"
    );


let quizIndex = 0;

let quizAnswered = false;


/* =========================================================
   LOAD QUIZ
========================================================= */

function loadQuiz() {

    quizAnswered = false;

    const current =
        quizData[quizIndex];

    quizNumber.textContent =
        String(
            quizIndex + 1
        ).padStart(
            2,
            "0"
        );

    const progress =
        (
            (quizIndex + 1) /
            quizData.length
        ) * 100;

    quizProgress.style.width =
        `${progress}%`;

    quizQuestion.textContent =
        current.question;

    quizOptions.innerHTML =
        "";

    quizResponse.classList.add(
        "hidden"
    );

    responseText.textContent =
        "";

    current.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "quiz-option";

            button.innerHTML = `

                <span class="option-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span class="option-text">
                    ${option.text}
                </span>

            `;

            button.addEventListener(
                "click",
                () => {

                    selectQuizAnswer(
                        button,
                        option.response
                    );

                }
            );

            quizOptions.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   SELECT QUIZ ANSWER
========================================================= */

function selectQuizAnswer(
    selectedButton,
    response
) {

    if (quizAnswered) {
        return;
    }

    quizAnswered = true;


    const allOptions =
        quizOptions.querySelectorAll(
            ".quiz-option"
        );

    allOptions.forEach(
        (button) => {

            button.classList.add(
                "disabled"
            );

        }
    );


    selectedButton.classList.add(
        "selected"
    );


    responseText.textContent =
        response;


    setTimeout(
        () => {

            quizResponse.classList.remove(
                "hidden"
            );

            quizResponse.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        },
        350
    );


    if (
        quizIndex ===
        quizData.length - 1
    ) {

        nextQuestion.textContent =
            "Selesai 💙";

    } else {

        nextQuestion.textContent =
            "Lanjut →";

    }

}


/* =========================================================
   NEXT QUESTION
========================================================= */

nextQuestion.addEventListener(
    "click",
    () => {

        if (!quizAnswered) {
            return;
        }

        if (
            quizIndex >=
            quizData.length - 1
        ) {

            quizQuestionArea.classList.add(
                "hidden"
            );

            quizComplete.classList.remove(
                "hidden"
            );

            quizComplete.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }


        quizIndex++;

        loadQuiz();

        quizQuestionArea.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* =========================================================
   RESTART QUIZ
========================================================= */

restartQuiz.addEventListener(
    "click",
    () => {

        quizIndex = 0;

        quizComplete.classList.add(
            "hidden"
        );

        quizQuestionArea.classList.remove(
            "hidden"
        );

        loadQuiz();

        quizQuestionArea.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* =========================================================
   FINISH QUIZ
========================================================= */

finishQuiz.addEventListener(
    "click",
    () => {

        quizComplete.classList.add(
            "hidden"
        );

        quizQuestionArea.classList.remove(
            "hidden"
        );

        quizIndex = 0;

        loadQuiz();

        showMenu();

    }
);


/* =========================================================
   INITIALIZE QUIZ
========================================================= */

loadQuiz();


/* =========================================================
   RESET SPECIAL SECTIONS WHEN REOPENED
========================================================= */

const surpriseSection =
    document.getElementById(
        "surpriseSection"
    );

const quizSection =
    document.getElementById(
        "quizSection"
    );


/*
   Saat menu dibuka kembali,
   kita biarkan progress kuis tetap ada.
   Surprise juga tetap terbuka setelah dibuka.
*/


/* =========================================================
   PREVENT ACCIDENTAL AUDIO CONTINUE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            !audioPlayer.paused
        ) {

            audioPlayer.pause();

            updateMusicCards();

        }

    }
);
