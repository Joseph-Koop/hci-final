export const projects = [
    {
        name: "Grading Campsite",
        equipment: [ "EX-2", "DT-1" ],
        employees: [ "John", "Andrew", "Tomas" ],
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
        equipment: [ "CT-1", "GR-1" ],
        employees: [ "Juan", "Matt" ],
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
        equipment: [ "DT-3", "CT-2" ],
        employees: [ "Carlos", "Ben", "Jose" ],
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
