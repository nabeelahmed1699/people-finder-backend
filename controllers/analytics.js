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

        // console.log('start ---> ', startDate)
        // console.log('end ---> ', endDate)
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
                            },
                            {
                                recovered:false
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
        const recoveredGraphData = await MissingPerson.aggregate(
            [
                {
                    $match: {
                        $and: [
                            {
                                createdAt: { $gte: startDate }
                            },
                            {
                                createdAt: { $lte: endDate }
                            },
                            {
                                recovered:true
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
        const foundGraphData = await FoundPerson.aggregate(
            [
                {
                    $match: {
                        $and: [
                            {
                                createdAt: { $gte: startDate }
                            },
                            {
                                createdAt: { $lte: endDate }
                            },
                            {
                                recovered:false
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
        const months = Array.from({length:12},(_,index)=>{
            const monthIndex = index + 1;
            const month = monthIndex < 10 ? '0' + monthIndex : monthIndex;
            const year = startDate.getFullYear();
            const dateString = `${year}-${month}-01`;
            return new Date(dateString);
        });          
        // console.log('months ---> ',months)
        const graphData = [
            {
                name:"Missing",
                type:'column',
                fill:'solid',
                data:Array.from({length:12},(_,index)=>{
                    const missingGraphObj = missingGraphData.find((data)=>data._id.month===index+1)
                    if(missingGraphObj!==undefined && missingGraphObj!==null){
                        return missingGraphObj.Total
                    }
                    else return 0
                })
            },
            {
                name:"Recovered",
                type:'area',
                fill:'gradient',
                data:Array.from({length:12},(_,index)=>{
                    const recoveredGraphObj = recoveredGraphData.find((data)=>data._id.month===index+1)
                    if(recoveredGraphObj!==undefined && recoveredGraphObj!==null){
                        return recoveredGraphObj.Total
                    }
                    else return 0
                })
            },
            {
                name:"Found",
                type:'line',
                fill:'solid',
                data:Array.from({length:12},(_,index)=>{
                    const foundGraphObj = foundGraphData.find((data)=>data._id.month===index+1)
                    if(foundGraphObj!==undefined && foundGraphObj!==null){
                        return foundGraphObj.Total
                    }
                    else return 0
                })
            }
        ]
        // console.log('graph ---> ',graphData)
        const recovered = missingRecovered + foundRecovered
        res.status(200).json({ status: 200, analytics: { organizations, missing, founded, total, recovered,graphData,months } });
    } catch (error) {
        res.status(500).json({ message: 'Database error!' });
        console.log('ERROR ACCURED: ', error);
    }
};

module.exports = {
    getAnalytics,
};
