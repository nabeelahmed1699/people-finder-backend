const MissingPerson = require('../schemas/missingPeople');
const FoundPerson = require('../schemas/foundPerson');
const Organization = require('../schemas/organization');

const getAnalytics = async (req, res) => {
    try {
        const organizations = await Organization.countDocuments({});
        const missing = await MissingPerson.countDocuments({});
        const founded = await FoundPerson.countDocuments({});
        const total = founded + missing;
        const missingRecovered = await MissingPerson.countDocuments({ recovered: true });
        const foundRecovered = await FoundPerson.countDocuments({ recovered: true });
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
