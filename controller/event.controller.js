const Events = require("../model/event.model");
const crypto = require("crypto");

// Helper function to calculate hash
const calculateHash = (data) => {
    return crypto.createHash("sha256").update(data).digest("hex");
};

// Helper function to validate the hash chain
const validateHashChain = (events) => {
    for (let i = 1; i < events.length; i++) {
        const prevHash = events[i].prevHash;
        const calculatedHash = calculateHash(JSON.stringify(events[i - 1]));
        if (prevHash !== calculatedHash) {
            return false; // Tampering detected
        }
    }
    return true;
};

exports.fetchEvents = async (req, res) => {
    const { startDate, endDate, event, appID, page = 1, limit = 10 } = req.query;

    const query = {};
    if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    if (event) query.event = event;
    if (appID) query.appID = appID;

    try {
        const skip = (page - 1) * limit;

        // Fetch events with pagination
        const events = await Events.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        // Validate hash chain integrity
        const isValidChain = validateHashChain(events);

        // Total records for pagination metadata
        const totalRecords = await Events.countDocuments(query);

        res.status(200).json({
            success: true,
            events,
            metadata: {
                totalRecords,
                totalPages: Math.ceil(totalRecords / limit),
                currentPage: Number(page),
            },
            isValidChain,
        });
    } catch (error) {
        console.error("Error occurred while fetching events", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.newEventLogs = async (req, res) => {
    const { event, appID, data } = req.body;

    if (!event || !appID || !data) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing required fields: event, appID, or data" 
        });
    }

    try {
        // Fetch the most recent event to get the previous hash
        const lastEvent = await Events.findOne().sort({ createdAt: -1 });

        // Calculate prevHash and currHash
        const prevHash = lastEvent ? lastEvent.currHash : "0"; // "0" for the first log
        const currHash = calculateHash(JSON.stringify({ event, appID, data, prevHash }));

        const newEvent = new Events({
            event,
            appID,
            data,
            prevHash,
            currHash,
        });

        // Save the event log
        await newEvent.save();

        res.status(201).json({ 
            success: true, 
            message: "Event log created successfully", 
            newEvent 
        });
    } catch (error) {
        console.error("Error occurred while logging new events", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};
