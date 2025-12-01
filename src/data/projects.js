export const projects = [
    {
        name: "Grading Campsite",
        group: "group1",
        materials: [
            {
                name: "maul",
                amount: 3
            },
            {
                name: "cement",
                amount: 2
            },
            {
                name: "stone",
                amount: 3
            },
            {
                name: "bricks",
                amount: 0
            }
        ],

        completion_percentage: .38,
        start_date: "01/01/2025",
        expected_completion: "12/31/2025",
        logs: [
            {
                date: "09/20/2025",
                message: "Delay - cement mixer didn't reach on time.",
            },
            {
                date: "06/13/2025",
                message: "Finished laying foundational white maul.",
            },
            {
                date: "01/12/2025",
                message: "Scouted site.",
            }
        ]
    },

    {
        name: "Hummingbird Roadwork",
        group: "group2",
        materials: [
            {
                name: "maul",
                amount: 2
            },
            {
                name: "cement",
                amount: 2
            },
            {
                name: "stone",
                amount: 12
            },
            {
                name: "bricks",
                amount: 1
            }
        ],

        completion_percentage: .68,
        start_date: "04/01/2025",
        expected_completion: "1/31/2026",
        logs: [
            {
                date: "09/20/2025",
                message: "Finished 1st paving.",
            },
            {
                date: "06/13/2025",
                message: "Delay - stormy weather all afternoon.",
            }
        ]
    },

    {
        name: "Paving Business Lot",
        group: "group3",
        materials: [
            {
                name: "maul",
                amount: 3
            },
            {
                name: "cement",
                amount: 0
            },
            {
                name: "stone",
                amount: 0
            },
            {
                name: "bricks",
                amount: 0
            }
        ],

        completion_percentage: .99,
        start_date: "02/01/2025",
        expected_completion: "11/31/2025",
        logs: []
    }
];

export const unassigned = {
    name: "Unassigned",
    group: "group4",
    materials: []
};

export const equipment = [
    { name: "EX-2", id: 1, group: "group1" },
    { name: "DT-1", id: 2, group: "group1" },
    { name: "CT-1", id: 3, group: "group2" },
    { name: "GR-1", id: 4, group: "group2" },
    { name: "DT-3", id: 5, group: "group3" },
    { name: "CT-2", id: 6, group: "group3" },
    { name: "EX-1", id: 7, group: "group4" },
    { name: "EX-3", id: 8, group: "group4" },
    { name: "DT-2", id: 9, group: "group4" }
];

export const employees = [
    { name: "John", id: 10, group: "group1" },
    { name: "Andrew", id: 11, group: "group1" },
    { name: "Tomas", id: 12, group: "group1" },
    { name: "Juan", id: 13, group: "group2" },
    { name: "Matt", id: 14, group: "group2" },
    { name: "Carlos", id: 15, group: "group3" },
    { name: "Ben", id: 16, group: "group3" },
    { name: "Jose", id: 17, group: "group3" },
    { name: "Peter", id: 18, group: "group4" },
    { name: "Brad", id: 19, group: "group4" },
    { name: "Alan", id: 20, group: "group4" }
];

