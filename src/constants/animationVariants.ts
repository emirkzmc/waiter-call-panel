const springBase = { type: 'spring' as const, stiffness: 100, damping: 15 };
const springSnappy = { type: 'spring' as const, stiffness: 100, damping: 10 };
const springSoft = { type: 'spring' as const, stiffness: 80, damping: 12 };
const springStiff = { type: 'spring' as const, stiffness: 200, damping: 12 };
const springFast = { type: 'spring' as const, stiffness: 400, damping: 10 };
const springModal = { type: 'spring' as const, stiffness: 300, damping: 25 };
const springSmooth = { type: 'spring' as const, stiffness: 80, damping: 15 };

export const customerPageVariants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    },

    title: {
        hidden: { opacity: 0, scale: 0.8, y: -20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                ...springBase,
                duration: 0.6,
            },
        },
    },

    selector: {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                ...springSoft,
                duration: 0.5,
            },
        },
    },

    buttonContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    },

    button: {
        hidden: { opacity: 0, x: -20, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: springSnappy,
        },
        hover: {
            scale: 1.05,
            transition: springFast,
        },
        tap: {
            scale: 0.95,
        },
    },
};

export const waiterPageVariants = {
    pageContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2,
            },
        },
    },

    cardContainer: {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                ...springBase,
                duration: 0.6,
            },
        },
    },

    sidebar: {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                ...springBase,
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    },

    logo: {
        hidden: { opacity: 0, scale: 0.8, rotate: -10 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: springStiff,
        },
    },

    navButton: {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: springSnappy,
        },
        hover: {
            scale: 1.02,
            transition: springFast,
        },
        tap: {
            scale: 0.98,
        },
    },

    contentArea: {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                ...springSmooth,
                delay: 0.3,
            },
        },
        exit: {
            opacity: 0,
            x: -30,
            transition: {
                duration: 0.2,
            },
        },
    },

    tableRow: {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: springSoft,
        },
        exit: {
            opacity: 0,
            x: -50,
            transition: {
                duration: 0.2,
            },
        },
    },

    tableContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
    },

    modalBackdrop: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
    },

    modalContent: {
        hidden: { opacity: 0, scale: 0.8, y: -50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: springModal,
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2,
            },
        },
    },

    actionButton: {
        hover: {
            scale: 1.05,
            transition: springFast,
        },
        tap: {
            scale: 0.95,
        },
    },
};
