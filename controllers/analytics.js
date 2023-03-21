const MissingPerson = require('../schemas/missingPeople');
const FoundPerson = require('../schemas/foundPerson');
const Organization = require('../schemas/organization');

const getAnalytics = async (req, res) => {
    try {
        const startDate = new Date()
        const endDate = new Date()

        startDate.setUTCDate(1)
        startDate.setUTCMonth(0)
        startDate.setUTCHours(0)
        startDate.setUTCMinutes(0)
        startDate.setUTCSeconds(0)
        startDate.setUTCMilliseconds(0)

        endDate.setUTCDate(31)
        endDate.setUTCMonth(11)
        endDate.setUTCHours(23)
        endDate.setUTCMinutes(59)
        endDate.setUTCSeconds(59)
        endDate.setUTCMilliseconds(999)

        console.log('start ---> ', startDate)
        console.log('end ---> ', endDate)
        const organizations = await Organization.countDocuments({});
        const missing = await MissingPerson.countDocuments({});
        const founded = await FoundPerson.countDocuments({});
        const total = founded + missing;
        const missingRecovered = await MissingPerson.countDocuments({ recovered: true });
        const foundRecovered = await FoundPerson.countDocuments({ recovered: true });
        const missingGraphData = await MissingPerson.aggregate(
            [
                {
                    $match: {
                        $and: [
                            {
                                createdAt: { $gte: startDate }
                            },
                            {
                                createdAt: { $lte: endDate }
                            }
                        ]
                    }
                },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" }
                        },
                        Total: { $sum: 1 }
                    }
                }]
        )
        console.log('graph data ---> ', missingGraphData)
        const months = Array.from({length:12},(_,index)=>{
            let month = ''+(index+1);
            if(parseInt(month)<10){
                month='0'+month
            }
            return '' + month + '/'+'01'+startDate.getFullYear()
        })
        console.log('months ---> ',months)
        const graphData = [
            {
                name:"Missing",
                type:'column',
                fill:'solid',
                data:Array.from({length:12},(_,index)=>{
                    const missingGraphObj = ''
                })
            }
        ]
        const recovered = missingRecovered + foundRecovered
        res.status(200).json({ status: 200, analytics: { organizations, missing, founded, total, recovered } });
    } catch (error) {
        res.status(500).json({ message: 'Database error!' });
        console.log('ERROR ACCURED: ', error);
    }
};

module.exports = {
    getAnalytics,
};
